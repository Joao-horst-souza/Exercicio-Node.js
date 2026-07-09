import pg from 'pg';
import PromptSync from 'prompt-sync';

const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});


async function listarAlunos() {

    try {
        await client.connect();

        const alunosTotal = await client.query('SELECT COUNT(*) FROM alunos');

        console.log("Total de alunos:");

        alunosTotal.rows.forEach(aluno => {
            console.log(`${aluno.count}`);
        })

        const alunosNota = await client.query('SELECT AVG(nota) FROM alunos');

        console.log("Média geral da turma:");

        alunosNota.rows.forEach(aluno => {
            console.log(`${aluno.avg}`)
        })

    } catch (erro) {
        console.log('❌ Erro ao buscar alunos:', erro.message);

    } finally {
        await client.end();
    }
}

listarAlunos();