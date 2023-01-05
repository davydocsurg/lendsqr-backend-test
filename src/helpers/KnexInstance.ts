import { createKnexConnection } from "../../config";

const getKnexInstance = async () => {
    const knex = await createKnexConnection();
    return knex;
};

export default getKnexInstance;
