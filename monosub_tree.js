/**
 * Created by anish on 11/13/16.
 */

/*
 * {
 "name": "";
 "start_year": 0;
 "end_year": 0;
 "description": "";
 "events": [];
 "children": [];
 }
 * */
var monosub_tree =
{
    "name": "Caesar Cipher",
    "start_year": -100,
    "end_year": 50,
    "description": "The description for Caesar Ciphers",
    "events":
        [
            {
                "name": "start",
                "description": "Some description for Caesar Ciphers",
                "id_": "caesar_invention"
            },
            {
                "name": "end",
                "description": "The end of the Caesar Cipher?",
                "id_": "caesar_death"
            }
        ],
    "children":
        [
            {
                "name": "Monosubstitution Cipher",
                'id_': 0,
                "start_year": 20,
                "end_year": 1600,
                "description": "Example dexcription",
                "events":
                    [
                        {
                            "name": "start",
                            "description": "It got invented!",
                            'id_': "monosub_invention"
                        },
                        {
                            "name": "Frequency Analysis Invented",
                            "description": "Freq Analysis Invention placeholder",
                            "year": 800,
                            'id_': "monosub_event_fa"
                        },
                        {
                            "name": "end",
                            "description": "Talk about the end of freq anal",
                            "id_": "monosub_death"
                        }
                    ],
                "children":
                    [
                        {
                            "name": "Nomenclators",
                            "start_year": 1500,
                            "end_year": 1600,
                            "description": "Placeholder desc for nomenclators",
                            "events":
                                [
                                    {
                                        "name": "start",
                                        "description": "The invention of nomenclators",
                                        "id_": "nomenclator_invention"
                                    },
                                    {
                                        "name": "end",
                                        "description": "The end of nomenclators",
                                        "id_": "nomenclator_death"
                                    }
                                ],
                            "children": []
                        },
                        {
                            "name": "Null Ciphers",
                            "start_year": 1500,
                            "end_year": 1800,
                            "description": "Placeholder for null cipher",
                            "events":
                                [
                                    {
                                        "name": "start",
                                        "description": "Null ciphers were invented!",
                                        "id_": "null_invention"
                                    },
                                    {
                                        "name": "end",
                                        "description": "These never really ended...",
                                        "id_": "null_death"
                                    }
                                ],
                            "children": []
                        },
                        {
                            "name": "Vigenere Cipher",
                            "start_year": 1400,
                            "end_year": 1920,
                            "description": "Placeholder desc for Vignere cipher",
                            "events":
                                [
                                    {
                                        "name": "start",
                                        "description": "Invention of the Vigne're Cipher",
                                        "id_": "vignere_invention"
                                    },
                                    {
                                        "name": "end",
                                        "description": "The breaking of the Vigne're Cipher",
                                        "id_": "vigenere_death"
                                    }
                                ],
                            "children":
                                [
                                    {
                                        "name": "Engima",
                                        "start_year": 1700,
                                        "end_year": 1945,
                                        "description": "Description for Enigma",
                                        "events":
                                            [
                                                {
                                                    "name": "start",
                                                    "description": "The invention of the Enigma",
                                                    "id_": "enigma_invention"
                                                },
                                                {
                                                    "name": "end",
                                                    "description": "The end of the Enigma",
                                                    "id_": "enigma_death"
                                                }
                                            ],
                                        "children":
                                            [
                                                {
                                                    "name": "Lorenz Encryption",
                                                    "start_year": 1800,
                                                    "end_year": 1945,
                                                    "description": "Description for Lorenz Crypto",
                                                    "events":
                                                        [
                                                            {
                                                                "name": "start",
                                                                "description": "Invention!",
                                                                "id_": "lorenz_invention"
                                                            },
                                                            {
                                                                "name": "end",
                                                                "description": "The fall of the Lorenz Cipher",
                                                                "id_": "lorenz_death"
                                                            }
                                                        ],
                                                    "children": []
                                                }
                                            ]
                                    },
                                    {
                                        "name": "Purple",
                                        "start_year": 1875,
                                        "end_year": 1946,
                                        "description": "Description for Purple",
                                        "events":
                                            [
                                                {
                                                    "name": "start",
                                                    "description": "The invention of Purple",
                                                    "id_": "purple_invention"

                                                },
                                                {
                                                    "name": "end",
                                                    "description": "The end of the Purple",
                                                    "id_": "purple_death"
                                                }
                                            ],
                                        "children": []
                                    }
                                ]
                        }
                    ]
            }
        ]
};