import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://9006d44e8c0610c0540182423e62aeec@o4510797265108992.ingest.de.sentry.io/4510797282934864",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 0.1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0, // This sets the sample rate for replays that are recorded when an error happens.
    replaysSessionSampleRate: 0.1, // This sets the sample rate for all replays. (10% of sessions)

    // You can remove this if you don't want to use Session Replay
    integrations: [
        Sentry.replayIntegration({
            // Additional Replay configuration goes here
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
