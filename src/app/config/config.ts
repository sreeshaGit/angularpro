/**
 * Global configuration parameters
 */
export function Config() {
    return {
        exportDataActions: [           
            { label: "Export to CSV", value: "Export to CSV" },
            { label: "Export to CRM", value: "Export to CRM"},
            { label: "Send Email", value: "Send Email" },
            { label: "Send SMS", value: "Send SMS" },
            { label: "Send WhatsApp", value: "Send WhatsApp" },
        ],

        hours: [
            { label: "0", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
            { label: "9", value: 9 },
            { label: "10", value: 10 },
            { label: "11", value: 11 },
            { label: "12", value: 12 },
            { label: "13", value: 13 },
            { label: "14", value: 14 },
            { label: "15", value: 15 },
            { label: "16", value: 16 },
            { label: "17", value: 17 },
            { label: "18", value: 18 },
            { label: "19", value: 19 },
            { label: "20", value: 20 },
            { label: "21", value: 21 },
            { label: "22", value: 22 },
            { label: "23", value: 23 }
        ],

        days: [
            { label: "0", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
            { label: "9", value: 9 },
            { label: "10", value: 10 },
            { label: "11", value: 11 },
            { label: "12", value: 12 },
            { label: "13", value: 13 },
            { label: "14", value: 14 },
            { label: "15", value: 15 },
            { label: "16", value: 16 },
            { label: "17", value: 17 },
            { label: "18", value: 18 },
            { label: "19", value: 19 },
            { label: "20", value: 20 },
            { label: "21", value: 21 },
            { label: "22", value: 22 },
            { label: "23", value: 23 },
            { label: "24", value: 24 },
            { label: "25", value: 25 },
            { label: "26", value: 26 },
            { label: "27", value: 27 },
            { label: "28", value: 28 },
            { label: "29", value: 29 },
            { label: "30", value: 30 },
        ],

        minutes: [
            { label: "5", value: 5 },
            { label: "10", value: 10 },
            { label: "15", value: 15 },
            { label: "20", value: 20 },
            { label: "25", value: 25 },
            { label: "30", value: 30 },
            { label: "35", value: 35 },
            { label: "40", value: 40 },
            { label: "45", value: 45 },
            { label: "50", value: 50 },
            { label: "55", value: 55 },
            ],

        timeActions: [
            { label: 'Before', value: 'before' },
            { label: 'After', value: 'after' },
            { label: 'Between', value: 'between' }
        ],

        filters: [{
            id: 'gender',
            label: 'gender',
            type: 'string',
            input: 'checkbox',
            values: [
                { value: 'M', label: 'Male' },
                { value: 'F', label: 'Female' }
            ],
        }, {
            id: 'id',
            field: 'id',
            label: 'id',            
            input: 'number',           
            optgroup: 'Slip',
            validation: {
                min: 0               
            }
        }, {
            id: 'playerId',
            field: 'playerId',
            label: 'playerId',
            input: 'number',
            optgroup: 'Slip',
            validation: {
                min: 0                
            }
        }, {
            id: 'isLiveBet',
            field: 'isLiveBet',
            label: 'isLiveBet',
            type: 'string',
            input: 'checkbox',
            values: [{ value: 1, label: 'In-play' },
            { value: 0, label: 'Pre-event' }],
            optgroup: 'Slip',
        }, {
            id: 'isFreeBet',
            field: 'isFreeBet',
            label: 'isFreeBet',
            type: 'string',
            input: 'checkbox',
            values: [{ value: 1, label: 'Free bet' },
            { value: 0, label: 'regular bet' }],
            optgroup: 'Slip',
        }, {
            id: 'isComboBet',
            field: 'isComboBet',
            label: 'isComboBet',
            type: 'string',
            input: 'checkbox',
            values: [{ value: 1, label: 'Multiple' },
            { value: 0, label: 'Single' }],
            optgroup: 'Slip',
        }, {
            id: 'betFold',
            field: 'betFold',
            label: 'betFold',
            type: 'integer',            
            optgroup: 'Slip',
            validation: {
                min: 0,
                max: 2
            }
        }, {
            id: 'created',
            field: 'created',
            label: 'created',
            type: 'date',
            validation: {
                format: 'yyyy-mm-dd hh:ii'
            },
            plugin: 'datetimepicker',
            plugin_config: {
                format: 'yyyy-mm-dd hh:ii',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
            optgroup: 'Slip',
        }, {
            id: 'placedOdds',
            field: 'placedOdds',
            label: 'placedOdds',
            type: 'integer',
            input: 'number',
            optgroup: 'Slip',
            validation: {
                min: 0               
            }
        }, {
            id: 'settledTs',
            field: 'settledTs',
            label: 'settledTs',
            type: 'date',
            validation: {
                format: 'yyyy-mm-dd hh:ii'
            },
            plugin: 'datetimepicker',
            plugin_config: {
                format: 'yyyy-mm-dd hh:ii',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
            optgroup: 'Slip',
        }, {
            id: 'settledOdds',
            field: 'settledOdds',
            label: 'settledOdds',
            type: 'integer',
            input: 'number',
            optgroup: 'Slip',
            validation: {
                min: 0              
            }
        }, {
            id: 'status',
            field: 'status',
            label: 'status',
            type: 'integer',
            input: 'checkbox',
            optgroup: 'Slip',
            values: [{ value: 0, label: 'Lost' },
                { value: 1, label: 'Won' },
                { value: 2, label: 'Active'}],
        }, {
            id: 'stake',
            field: 'stake',
            label: 'stake',
            type: 'integer',
            input: 'number',
            optgroup: 'Slip',
            validation: {
                min: 0              
            }
        }, {
            id: 'winnings',
            field: 'winnings',
            label: 'winnings',
            type: 'integer',
            optgroup: 'Slip',
        },
        {
            id: 'playerDataId',
            field: 'id',
            label: 'id',
            type: 'integer',
            input: 'number',
            optgroup: 'player',
            validation: {
                min: 0               
            }
        }, {
            id: 'playerGender',
            field: 'gender',
            label: 'gender',
            type: 'string',
            input: 'checkbox',
            values: [
                { value: 'M', label: 'M' },
                { value: 'F', label: 'F' },
            ],
            optgroup: 'player',
        },
        {
            id: 'age',
            field: 'age',
            label: 'age',
            type: 'integer',           
            validation: {
                max: 3
            },
            optgroup: 'player',
        }, {
            id: 'country',
            field: 'country',
            label: 'country',
            type: 'string',
            optgroup: 'player',
        }, {
            id: 'registrationDate',
            field: 'registrationDate',
            label: 'registrationDate',
            type: 'date',
            validation: {
                format: 'yyyy-mm-dd hh:ii'
            },
            plugin: 'datetimepicker',
            plugin_config: {
                format: 'yyyy-mm-dd hh:ii',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true,
                minuteStep: 5
            },
            optgroup: 'player'
        }, {
            id: 'betId',
            field: 'betId',
            label: 'betId',
            type: 'integer',            
            optgroup: 'betderived',
            validation: {
                min: 0              
            }
        }, {
            id: 'sportsId',
            field: 'sportsId',
            label: 'sportsId',
            type: 'integer',
            optgroup: 'betderived',
        }, {
            id: 'slipCreated',
            field: 'slipCreated',
            label: 'slipCreated',
            type: 'date',
            validation: {
                format: 'yyyy-mm-dd hh:ii'
            },
            plugin: 'datetimepicker',
            plugin_config: {
                format: 'yyyy-mm-dd hh:ii',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
            optgroup: 'betderived',
        }, {
            id: 'slipId',
            field: 'slipId',
            label: 'slipId',
            type: 'integer',           
            optgroup: 'betderived',
            validation: {
                min: 0               
            }
        }, {
            id: 'playerIdBet',
            field: 'playerId',
            label: 'playerId',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0               
            }
        }, {
            id: 'leagueId',
            field: 'leagueId',
            label: 'leagueId',
            type: 'integer',
            optgroup: 'betderived',
        }, {
            id: 'eventId',
            field: 'eventId',
            label: 'eventId',
            type: 'integer',
            optgroup: 'betderived',
        }, {
            id: 'isLiveBet1',
            field: 'isLiveBet',
            label: 'isLiveBet',
            type: 'string',
            input: 'checkbox',
            values: [{ value: '1', label: 'In-play' },
                { value: '0', label: 'Pre-event' }],
            optgroup: 'betderived',
        }, {
            id: 'isFreeBet1',
            field: 'isFreeBet',
            label: 'isFreeBet',
            type: 'string',
            input: 'checkbox',
            values: [{ value: '1', label: 'Free bet' },
                { value: '0', label: 'regular bet' }],
            optgroup: 'betderived',
        }, {
            id: 'isComboBet1',
            field: 'isComboBet',
            label: 'isComboBet',           
            input: 'checkbox',
            values: [{ value: '1', label: 'Multiple'},
                    { value: '0', label: 'Single'}],
            optgroup: 'betderived',
        },
        {
            id: 'betFold1',
            field: 'betFold',
            label: 'betFold',
            type: 'integer',
            optgroup: 'betderived',
            validation: {
                min: 0,
                max: 2
            }
        },
        {
            id: 'placedOdds1',
            field: 'placedOdds',
            label: 'placedOdds',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
        },
        {
            id: 'settledTs1',
            field: 'settledTs',
            label: 'settledTs',
            type: 'date',
            validation: {
                format: 'yyyy-mm-dd hh:ii'
            },
            plugin: 'datetimepicker',
            plugin_config: {
                format: 'yyyy-mm-dd hh:ii',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
            optgroup: 'betderived',
        }, {
            id: 'settledOdds1',
            field: 'settledOdds',
            label: 'settledOdds',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0
            }
        }, {
            id: 'status1',
            field: 'status',
            label: 'status',
            type: 'string',
            optgroup: 'betderived',
            input: 'checkbox',           
            values: [{ value: 0, label: 'Lost' },
            { value: 1, label: 'Won' },
            { value: 2, label: 'Active' }],
        }, {
            id: 'stake1',
            field: 'stake',
            label: 'stake',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0
            }
        },{
            id: 'turnover',
            field: 'turnover',
            label: 'turnover',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0               
            }
        },
        {
            id: 'winnings1',
            field: 'winnings',
            label: 'winnings',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0             
            }
        },
        {
            id: 'pl',
            field: 'pl',
            label: 'pl',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0
            }
        },
        {
            id: 'avgOdds',
            field: 'avgOdds',
            label: 'avgOdds',
            type: 'integer',
            input: 'number',
            optgroup: 'betderived',
            validation: {
                min: 0
            }
        },
        //{
        //    id: 'node',
        //    field: 'node',
        //    label: 'node',
        //    type: 'string',
        //    optgroup: 'multi_bet_claim',
        //},
        {
            id: 'sports',
            field: 'name',
            label: 'sportName',
            type: 'string',
            optgroup: 'sports',
        }, {
            id: 'leagueName',
            field: 'name',
            label: 'leagueName',
            type: 'string',
            optgroup: 'league',
        }, {
            id: 'eventName',
            field: 'name',
            label: 'eventName',
            type: 'string',
            optgroup: 'event',
        }
        ]
    }
}
