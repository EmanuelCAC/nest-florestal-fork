import { SetMetadata } from "@nestjs/common";

export const IS_SELF_KEY = 'isSelf';

export const IsSelf = () => SetMetadata(IS_SELF_KEY, true);