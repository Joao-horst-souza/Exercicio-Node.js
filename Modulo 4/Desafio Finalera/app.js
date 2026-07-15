import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'postgres',
    database: 'guild_db'
});

async function VerMissões() {

        try {
        const r = await client.query(`SELECT titulo, dificuldade, recompensa_xp, recompensa_ouro FROM missoes WHERE concluida = 'false'`);

        console.log("\n=== MISSÕES A CONCLUIR ===\n");

        r.rows.forEach((missoes) => {
            console.log(` Titulo: ${missoes.titulo} | Dificuldade: ${missoes.dificuldade} | EXPERIENCE POINTS: ${missoes.recompensa_xp} | RECOMPENSA: ${missoes.recompensa_ouro}`);
        });

        } catch (erro) {
            console.log("Erro ao buscar ranking:", erro.message);
        }
}


async function menu() {

    try {
        await client.connect();
        console.log('✅ Conectado ao banco de dados!\n');

        let rodando = true;

        while (rodando) {

            console.log('════════════════════════════════');
            console.log('   🧙 GUILD DOS AVENTUREIROS   ');
            console.log('════════════════════════════════');
            console.log('1 - Ver Aventureiros e suas classes ');
            console.log('2 - Ver missões disponíveis ');
            console.log('3 - Ver ranking da guild ');
            console.log('4 - Cadastrar Aventureiro ');
            console.log('5 - Atribuir missão e aventureiro' );
            console.log('6 - Concluir missão (ganhar XP) ');
            console.log('7 - Histórico de missões   por aventurerio ');
            console.log('8 - Estatísca por classe ');
            console.log('0 - Sair');
            console.log('════════════════════════════════');

            const opcao = prompt('\nEscolha uma opção: ');

            switch (opcao) {
                case '1': await VerAventureiros(); break;
                case '2': await VerMissões(); break;
                case '3': await VerRanking(); break;
                case '4': await CadastrarAventureiro(); break;
                case '5': await AtribuirMissão();   break;
                case '6': await ConcluirMissão(); break;
                case '7': await Historico(); break;
                case '8': await MostrarEstat(); break;
                case '0': rodando = false;   break;
                default: console.log('❌ Opção inválida.');
            }
        }

    } catch (erro) {
        console.error('❌ Erro no sistema, Vá embora:');
        console.error(erro.stack);

    } finally {
        await client.end();
        console.log('\n👋 Até logo!');
    }
}

menu();