import {NestFactory} from "@nestjs/core";
import {from} from "rxjs";

import {AppModule} from "./AppModule";
import {Logger} from "@nestjs/common";

const logger = new Logger('Bootstrap');

// @ts-ignore
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    return app.listen(4000);
}

from(bootstrap()).subscribe({
    error: err => {
        logger.error(err.toString());
    }
});
