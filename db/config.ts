import {column, defineDb, defineTable} from 'astro:db';

const User = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        email: column.text({ unique: true }),
        username: column.text(),
        password: column.text(),
    },
    indexes: [
        { on: ["id", "email"], unique: true }
    ]
});

// https://astro.build/db/config
export default defineDb({
    tables: {
        User
    }
});