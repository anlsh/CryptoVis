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
    "id_": "caesar_desc",
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
                "start_year": 20,
                "crack_year": 800,
                "end_year": 1600,
                "id_": "monosub_desc",
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
                            "id_": "nomenclator_desc",
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
                            "id_": "null_desc",
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
                            "start_year": 1553,
                            "crack_year": 1846,
                            "end_year": 1940,
                            "id_": "vigenere_desc",
                            "events":
                                [
                                    {
                                        "name": "start",
                                        "description": "Invention of the Vigne're Cipher",
                                        "id_": "vignere_invention"
                                    },
                                    {
                                        "name": "crack",
                                        "year": 1846,
                                        "id_": "vigenere_death"
                                    }
                                ],
                            "children":
                                [
                                    {
                                        "name": "Engima",
                                        "start_year": 1918,
                                        "end_year": 1941,
                                        "id_": "enigma_desc",
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
                                                    "name": "Purple",
                                                    "start_year": 1930,
                                                    "end_year": 1941,
                                                    "id_": "purple_desc",
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
                                                },
                                                {
                                                    "name": "Lorenz Encryption",
                                                    "start_year": 1935,
                                                    "end_year": 1944,
                                                    "id_": "lorenz_desc",
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
                                    }
                                ]
                        }
                    ]
            }
        ]
};