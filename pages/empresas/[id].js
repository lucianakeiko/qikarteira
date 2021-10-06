import { google } from 'googleapis';

export async function getServerSideProps( { query }) {

    // Auth

    const auth = await google.auth.getClient({scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query -- https://youtu.be/K6Vcfm7TA5U

    const { id } = query;
    const range =  `classificacao!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,

    });

    // Result

    const [SETOR, SUBSETOR ] = response.data.values[0];

    return {
        props: {
            SETOR,
            SUBSETOR
        }
    }
}


export default function Empesa( { SETOR, SUBSETOR} ) {
    return <article>
        <h1> { SETOR } </h1>
        <div> { SUBSETOR } </div>
    </article>
}
