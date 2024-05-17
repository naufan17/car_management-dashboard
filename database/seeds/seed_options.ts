import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("options").del();

    await knex("options").insert([
        {
            "id": 1,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "option": "Cruise Control"
        },
        {
            "id": 2,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "option": "Tinted Glass"
        },
        {
            "id": 3,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "option": "AM/FM Stereo"
        },
        {
            "id": 4,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "option": "Keyless Entry"
        },
        {
            "id": 5,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "option": "Power Windows"
        },
        {
            "id": 6,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "option": "MP3 (Single Disc)"
        },
        {
            "id": 7,
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "option": "Navigation System"
        },
        {
            "id": 8,
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "option": "Bluetooth"
        },
        {
            "id": 9,
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "option": "Leather Seats"
        },
        {
            "id": 10,
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "option": "Backup Camera"
        },
        {
            "id": 11,
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "option": "Remote Start"
        },
        {
            "id": 12,
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "option": "Heated Seats"
        },
        {
            "id": 13,
            "car_id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "option": "Sunroof"
        },
        {
            "id": 14,
            "car_id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "option": "Parking Sensors"
        },
        {
            "id": 15,
            "car_id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "option": "Adaptive Cruise Control"
        },
        {
            "id": 16,
            "car_id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "option": "Lane Departure Warning"
        },
        {
            "id": 17,
            "car_id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "option": "Blind Spot Monitoring"
        },
        {
            "id": 18,
            "car_id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "option": "Apple CarPlay"
        },
        {
            "id": 19,
            "car_id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "option": "Android Auto"
        },
        {
            "id": 20,
            "car_id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "option": "Heated Steering Wheel"
        },
        {
            "id": 21,
            "car_id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "option": "Remote Start"
        },
        {
            "id": 22,
            "car_id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "option": "Heated Seats"
        }
    ]);
};
