import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";


const pb = new PocketBase(import.meta.env.POCKETBASE_URL) as TypedPocketBase;
export default pb;