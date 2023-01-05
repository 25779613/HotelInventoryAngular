import { InjectionToken } from "@angular/core";
import { ApplicationConfig } from "@angular/platform-browser";
import { AppConfig } from "./appconfig.interface";
import { environment } from "../../environments/environment"

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
    apiEndpoint: environment.apiEndpoint,
}