import db from "../database/index"


export const queryaddress = async (address) => {
    try {
        await db.connect()
        const { rows } = await db.query('SELECT * FROM mappingaddress WHERE address = $1', [address])
        console.log(JSON.stringify(rows))
        return 1;
    } catch (err) {
        console.log('Database ' + err)
    }
    finally {
        db.end();
    }
}