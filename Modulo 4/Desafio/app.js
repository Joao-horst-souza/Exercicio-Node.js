import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});



async function listar() {
    
    const listarJogos = await client.query('SELECT * FROM jogos ORDER BY id');
        console.log('\n ===JOGOS=== \n');
        console.log('     ID    |    Titulos     |     Genero     |     Nota     |     Lançamento     ');
    listarJogos.rows.forEach( jogos => {
        console.log(` ${jogos.id} | ${jogos.titulo} | ${jogos.genero} | ${jogos.nota} | ${jogos.lancamento} `)
    });
}

async function buscar() {
    
    const generoBuscado = prompt('Digite o Gênero Desejado: ').trim();

    if(!generoBuscado){
        console.log('Gênero não pode ser vazio, burrão');
        return;
    }
    const queryText = 'SELECT * from jogos WHERE LOWER(genero) = LOWER($1) ORDER BY titulo';
    const result = await client.query(queryText, [generoBuscado]);

    console.log(`\n═════════════════════════════════════════`);
    console.log(`  RESULTADO DA BUSCA PARA: "${generoBuscado.toUpperCase()}"`);
    console.log(`═════════════════════════════════════════\n`);

    if (result.rows.length === 0) {
        console.log('Nenhum jogo encontrado para este gênero.');
        return;
    }

    result.rows.forEach(jogo => {
        console.log(`${jogo.id} | ${jogo.titulo} | ${jogo.genero} | ${jogo.nota} | ${jogo.lancamento}`);
    });
}



// async function atualizar() {
//     await listar();
//     const id    = Number(prompt('\nID do produto: '));
//     const preco = Number(prompt('Novo preço: '));

//     const r = await client.query(
//         'UPDATE produtos SET preco = $1 WHERE id = $2 RETURNING nome',
//         [preco, id]
//     );
//     if (r.rows.length === 0) {
//         console.log('❌ Produto não encontrado.');
//     } else {
//         console.log(`\n✅ Preço de "${r.rows[0].nome}" atualizado!`);
//     }
// }

// async function remover() {
//     await listar();
//     const id = Number(prompt('\nID do produto a remover: '));
//     const ok = prompt('Confirmar remoção? (s/n): ');

//     if (ok.toLowerCase() !== 's') { console.log('Cancelado.'); return; }

//     const r = await client.query(
//         'DELETE FROM produtos WHERE id = $1 RETURNING nome',
//         [id]
//     );
//     if (r.rows.length === 0) {
//         console.log('❌ Produto não encontrado.');
//     } else {
//         console.log(`\n✅ "${r.rows[0].nome}" removido.`);
//     }
// }



async function menu() {

    try {
        await client.connect();
        console.log('✅ Conectado ao banco de dados!\n');

        let rodando = true;

        while (rodando) {

            console.log('════════════════════════════════');
            console.log('   🎮 MINHA BIBLIOTECA GAMER    ');
            console.log('════════════════════════════════');
            console.log('1 - Ver todos os jogos');
            console.log('2 - Buscar por gênero ');
            console.log('3 - Ver ranking (top 3 notas)');
            console.log('4 - Adicionar jogo');
            console.log('5 - Atualizar nota');
            console.log('6 - Remover jogo');
            console.log('0 - Sair');
            console.log('════════════════════════════════');

            const opcao = prompt('\nEscolha uma opção: ');

            switch (opcao) {
                case '1': await listar  ();    break;
                case '2': await buscar(); break;
                case '3': await atualizar(); break;
                case '4': await remover();   break;
                case '0': rodando = false;   break;
                default: console.log('❌ Opção inválida.');
            }
        }

    } catch (erro) {
        console.log('❌ Erro no sistema, Vá embora:', erro.message);

    } finally {
        await client.end();
        console.log('\n👋 Até logo!');
    }
}

menu();