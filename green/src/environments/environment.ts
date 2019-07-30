// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    baseUrl: 'https://mrgreen.bettorlogic.com',
    refreshLive: 10 * 1000,
    refreshPre: 5 * 60 * 1000,
    refreshMin: 60 * 1000,
    widgetsCategories: {
        footballTopAssist: 'MrGreen.FootballTopBets',
        soccerPreSpin: 'MrGreen.FootballPreCombiSpin',
        soccerLiveSpin: 'MrGreen.FootballCombiSpin',
        footballMultiBet: 'MrGreen.Multibet',
        horseFinder: 'MrGreen.HorseFinder',
        carousel: 'MrGreen.Carousel',
        tennisTopbets: 'MrGreen.TennisTopBets',
        liveTennis: 'MrGreen.LiveTennis',
        iceHockey: 'MrGreen.IceHockey',
    }
};
