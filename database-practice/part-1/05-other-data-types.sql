DROP TABLE IF EXISTS basics.app_events;

CREATE TABLE basics.app_events (
    -- UUID
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    event_name TEXT NOT NULL,

    -- JSONB
    metadata JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.app_events (event_name, metadata)
VALUES ('sign-up', '{"browser": "chrome"}'), ('sign-in', '{"user": "Sakib"}');


SELECT * FROM basics.app_events;

SELECT event_name, metadata ->> 'browser' as browser
FROM basics.app_events
WHERE metadata ? 'browser';