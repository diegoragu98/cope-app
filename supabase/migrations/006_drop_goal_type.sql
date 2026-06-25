-- =====================================================
-- MIGRACIÓN 006: Eliminar columna goal_type de goals
-- =====================================================
-- `goal_type` (varchar(50) NOT NULL, CHECK IN ('grow','preserve','project','obligation'))
-- entró a producción FUERA del control de versiones (no está en schema.sql ni en
-- ninguna migración previa). Ningún código del repo la referencia y su taxonomía
-- semántica NO es parte de este módulo. El módulo de Metas y Proyectos corre 100%
-- sobre `type` (meta/proyecto).
--
-- Su NOT NULL sin default rompía createGoal (null-violation al insertar sin goal_type).
-- La tabla está vacía (0 filas), por lo que el DROP es seguro y sin backfill.
-- =====================================================

ALTER TABLE goals DROP COLUMN IF EXISTS goal_type;
