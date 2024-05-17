import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // await knex("specs").del();

    await knex("specs").insert([
        {
            "spec_id": 1,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "spec": "Brake assist"
        },
        {
            "spec_id": 2,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "spec": "Leather-wrapped shift knob"
        },
        {
            "spec_id": 3,
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "spec": "Glove box lamp"
        },
        {
            "spec_id": 4,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "spec": "Rear passenger map pockets"
        },
        {
            "spec_id": 5,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "spec": "Electrochromic rearview mirror"
        },
        {
            "spec_id": 6,
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "spec": "Dual chrome exhaust tips"
        },
        {
            "spec_id": 7,
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "spec": "Direct-type tire pressure monitor system"
        },
        {
            "spec_id": 8,
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "spec": "Cargo area lamp"
        },
        {
            "spec_id": 9,
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "spec": "Automatic temperature control"
        },
        {
            "spec_id": 10,
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "spec": "Electronic stability"
        },
        {
            "spec_id": 11,
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "spec": "Trip computer"
        },
        {
            "spec_id": 12,
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "spec": "Power steering"
        },
        {
            "spec_id": 13,
            "car_id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "spec": "Power door mirrors"
        },
        {
            "spec_id": 14,
            "car_id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "spec": "Front bucket seats"
        },
        {
            "spec_id": 15,
            "car_id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "spec": "Navigation system"
        },
        {
            "spec_id": 16,
            "car_id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "spec": "Wireless phone connectivity"
        },
        {
            "spec_id": 17,
            "car_id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "spec": "Power driver seat"
        },
        {
            "spec_id": 18,
            "car_id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "spec": "Rear window defroster"
        },
        {
            "spec_id": 19,
            "car_id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "spec": "Front bucket seats"
        },
        {
            "spec_id": 20,
            "car_id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "spec": "Rear window defroster"
        },
        {
            "spec_id": 21,
            "car_id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "spec": "Exterior parking camera rear"
        },
        {
            "spec_id": 22,
            "car_id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "spec": "Front dual zone A/C"
        }
    ]);
};
