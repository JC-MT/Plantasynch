\ c plantasynch_db;
INSERT INTO garden (
        id,
        name,
        image,
        origin,
        category,
        ideal_light,
        ideal_watering,
        last_water,
        is_healthy,
        email,
        user_id,
        demo_plant,
        actions,
        skip_count,
        skip_history
    )
VALUES (
        1,
        'Peace Lily',
        '20181128081621_file_5bfef795f08dd.webp',
        'South Africa',
        'Tropical',
        'Indirect',
        'Keep soil moist, water when half dry',
        '2022/08/25',
        true,
        'jancarlosmatias2@gmail.com',
        0,
        true,
        '[{ "action": "Watered", "date": "2022/08/25", "action_number": 1}, { "action": "Watered", "date": "2022/08/30", "action_number": 2}]',
        0,
        ARRAY [ 1, 1, 1]
    ),
    (
        2,
        'Fern',
        'fernTest.jpeg',
        'UK',
        'Tropical',
        'Indirect',
        'Keep soil moist, water when half dry',
        '2022/08/30',
        false,
        'jancarlosmatias@gmail.com',
        0,
        true,
        '[{ "action": "Skipped", "date": "2022/08/25", "action_number": 1}, { "action": "Skipped", "date": "2022/08/30", "action_number": 2}]',
        0,
        ARRAY [ 2, 2, 2]
    ),
    (
        3,
        'Snake Plant',
        'black-gold-snake-plant_x560.progressive.webp',
        'West Africa',
        'Tropical',
        'Shaded',
        'Keep soil dry, water when dry',
        '2022/08/25',
        true,
        'jancarlosmatias2@gmail.com',
        0,
        true,
        '[{ "action": "Updated", "date": "2022/08/25", "action_number": 1}, { "action": "Updated", "date": "2022/08/30", "action_number": 2}]',
        0,
        ARRAY [ 3, 3, 3]
    );
INSERT INTO platasynch_users (id, name, password, email, joined_date)
VALUES (
        1,
        'Jan',
        'a',
        'jancarlosmatias2@gmail.com',
        NOW()
    ),
    (
        2,
        'Sonnet',
        'b',
        'jancarlosmatias@gmail.com',
        NOW()
    );