-- Migración limpia: Elimina esquema antiguo y crea el schema definitivo del MVP
-- ====================================================================

-- Eliminar tablas antiguas (orden por FK)
DROP TABLE IF EXISTS commitments CASCADE;
DROP TABLE IF EXISTS receipts CASCADE;
DROP TABLE IF EXISTS fav_products CASCADE;
DROP TABLE IF EXISTS shopping_lists CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS families CASCADE;

-- ====================================================================
-- NÚCLEO FAMILIAR
-- ====================================================================

CREATE TABLE familias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo_cuenta TEXT NOT NULL CHECK (tipo_cuenta IN ('individual', 'familiar')),
  codigo_invite TEXT UNIQUE DEFAULT substring(gen_random_uuid()::text, 1, 8),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE miembros_familia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('admin', 'miembro', 'visualizador')),
  aporte_tipo TEXT CHECK (aporte_tipo IN ('porcentaje', 'monto_fijo')),
  aporte_valor NUMERIC(12,2),
  datos_privados BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (familia_id, usuario_id)
);

-- ====================================================================
-- GASTOS (recurrentes, esporádicos, cuotas de crédito)
-- ====================================================================

CREATE TABLE gastos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  miembro_id UUID REFERENCES miembros_familia(id) ON DELETE SET NULL,
  descripcion TEXT NOT NULL,
  categoria TEXT NOT NULL,
  monto NUMERIC(12,2) NOT NULL CHECK (monto > 0),
  fecha DATE NOT NULL,
  tipo_gasto TEXT NOT NULL CHECK (tipo_gasto IN ('recurrente', 'esporadico', 'credito')),
  ambito TEXT CHECK (ambito IN ('individual', 'familiar')),
  frecuencia TEXT CHECK (frecuencia IN ('semanal', 'quincenal', 'mensual', 'bimestral', 'anual')),
  dia_vencimiento INT CHECK (dia_vencimiento BETWEEN 1 AND 31),
  es_cuota BOOLEAN DEFAULT FALSE,
  num_cuotas INT,
  valor_cuota NUMERIC(12,2),
  valor_contado NUMERIC(12,2),
  pagado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- CRÉDITOS / DEUDAS
-- ====================================================================

CREATE TABLE creditos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('libre_inversion', 'hipotecario', 'educativo', 'tarjeta')),
  entidad TEXT NOT NULL,
  saldo_capital NUMERIC(14,2) NOT NULL,
  tasa_ea NUMERIC(6,4) NOT NULL,
  plazo_meses INT NOT NULL,
  cuota_mensual NUMERIC(12,2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- METAS DE AHORRO
-- ====================================================================

CREATE TABLE metas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  monto_objetivo NUMERIC(12,2) NOT NULL,
  progreso_actual NUMERIC(12,2) DEFAULT 0,
  fecha_limite DATE,
  tipo_meta TEXT NOT NULL CHECK (tipo_meta IN ('individual', 'compartida')),
  participantes UUID[] DEFAULT '{}',
  icono TEXT DEFAULT 'piggy-bank',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE abonos_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meta_id UUID REFERENCES metas(id) ON DELETE CASCADE,
  miembro_id UUID REFERENCES miembros_familia(id) ON DELETE SET NULL,
  monto NUMERIC(12,2) NOT NULL CHECK (monto > 0),
  nota TEXT,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- SUSCRIPCIONES IA / HERRAMIENTAS DIGITALES
-- ====================================================================

CREATE TABLE suscripciones_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  miembro_id UUID REFERENCES miembros_familia(id) ON DELETE CASCADE,
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  nombre_plan TEXT NOT NULL,
  proveedor TEXT NOT NULL,
  tipo_plan TEXT NOT NULL CHECK (tipo_plan IN ('mensual', 'anual')),
  monto NUMERIC(12,2) NOT NULL,
  fecha_facturacion DATE,
  ultima_fecha_uso DATE,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- NUDGE LOG (registro de sugerencias del asistente)
-- ====================================================================

CREATE TABLE nudge_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  miembro_id UUID REFERENCES miembros_familia(id) ON DELETE CASCADE,
  tipo_nudge TEXT NOT NULL CHECK (tipo_nudge IN ('ahorro', 'precio', 'limpieza', 'pago', 'celebracion')),
  mensaje TEXT NOT NULL,
  aceptado BOOLEAN,
  enviado_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- DESPENSA (Phase 2, tablas base)
-- ====================================================================

CREATE TABLE listas_compra (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  presupuesto NUMERIC(12,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prod_favoritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  categoria TEXT,
  tienda_preferida TEXT,
  ultimo_precio NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE facturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES auth.users(id),
  familia_id UUID REFERENCES familias(id) ON DELETE CASCADE,
  storage_url TEXT,
  proveedor TEXT,
  total NUMERIC(12,2),
  deducible_renta BOOLEAN DEFAULT FALSE,
  procesado_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================================

-- Helper function: obtener familia_id del usuario autenticado
CREATE OR REPLACE FUNCTION get_user_familia_id()
RETURNS UUID AS $$
  SELECT familia_id FROM miembros_familia
  WHERE usuario_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Habilitar RLS en todas las tablas
ALTER TABLE familias ENABLE ROW LEVEL SECURITY;
ALTER TABLE miembros_familia ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE abonos_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE nudge_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE listas_compra ENABLE ROW LEVEL SECURITY;
ALTER TABLE prod_favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (patrón: familia_id debe coincidir)

CREATE POLICY "Acceso familiar" ON familias FOR ALL
  USING (id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON miembros_familia FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON gastos FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON creditos FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON metas FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON abonos_meta FOR ALL
  USING (meta_id IN (SELECT id FROM metas WHERE familia_id = get_user_familia_id()));

CREATE POLICY "Acceso familiar" ON suscripciones_ia FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON nudge_log FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON listas_compra FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON prod_favoritos FOR ALL
  USING (familia_id = get_user_familia_id());

CREATE POLICY "Acceso familiar" ON facturas FOR ALL
  USING (familia_id = get_user_familia_id());

-- ====================================================================
-- ÍNDICES (optimización)
-- ====================================================================

CREATE INDEX idx_miembros_familia_usuario ON miembros_familia(usuario_id);
CREATE INDEX idx_miembros_familia_familia ON miembros_familia(familia_id);
CREATE INDEX idx_gastos_familia ON gastos(familia_id);
CREATE INDEX idx_gastos_fecha ON gastos(fecha);
CREATE INDEX idx_creditos_familia ON creditos(familia_id);
CREATE INDEX idx_metas_familia ON metas(familia_id);
CREATE INDEX idx_suscripciones_familia ON suscripciones_ia(familia_id);
CREATE INDEX idx_nudge_log_familia ON nudge_log(familia_id);
