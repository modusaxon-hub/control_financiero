-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FAMILIES TABLE
CREATE TABLE IF NOT EXISTS families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id UUID REFERENCES families (id) ON DELETE SET NULL,
    full_name TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('main', 'member')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SHOPPING LISTS
CREATE TABLE IF NOT EXISTS shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    family_id UUID REFERENCES families (id) NOT NULL,
    title TEXT NOT NULL,
    budget DECIMAL DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (
        status IN (
            'active',
            'completed',
            'archived'
        )
    ),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FAVORITE PRODUCTS
CREATE TABLE IF NOT EXISTS fav_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    family_id UUID REFERENCES families (id) NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    pref_store TEXT,
    last_price DECIMAL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RECEIPTS (OCR METADATA)
CREATE TABLE IF NOT EXISTS receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID REFERENCES auth.users (id),
    family_id UUID REFERENCES families (id) NOT NULL,
    storage_url TEXT,
    vendor TEXT,
    total DECIMAL DEFAULT 0,
    tax_deductible BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COMMITMENTS (FLEXIBLE PAYMENTS)
CREATE TABLE IF NOT EXISTS commitments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    family_id UUID REFERENCES families (id) NOT NULL,
    title TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    category TEXT,
    cycle TEXT DEFAULT 'monthly' CHECK (
        cycle IN (
            'weekly',
            'bi-weekly',
            'monthly'
        )
    ),
    next_due_date DATE,
    is_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;

ALTER TABLE fav_products ENABLE ROW LEVEL SECURITY;

ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

ALTER TABLE commitments ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own family') THEN
        CREATE POLICY "Users can view their own family" ON families FOR SELECT USING (id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view profiles in their family') THEN
        CREATE POLICY "Users can view profiles in their family" ON profiles FOR SELECT USING (family_id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Family isolation for shopping_lists') THEN
        CREATE POLICY "Family isolation for shopping_lists" ON shopping_lists FOR ALL USING (family_id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Family isolation for fav_products') THEN
        CREATE POLICY "Family isolation for fav_products" ON fav_products FOR ALL USING (family_id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Family isolation for receipts') THEN
        CREATE POLICY "Family isolation for receipts" ON receipts FOR ALL USING (family_id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Family isolation for commitments') THEN
        CREATE POLICY "Family isolation for commitments" ON commitments FOR ALL USING (family_id IN (SELECT family_id FROM profiles WHERE id = auth.uid()));
    END IF;
END $$;