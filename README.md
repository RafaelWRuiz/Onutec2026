# ONU Tec

Protótipo mobile-first para inscrição em dupla na simulação da ONU.

## Abrir localmente

Abra `index.html` em um servidor estático. Em uma implantação na Vercel, os arquivos da raiz são publicados como site estático.

## Fluxo já implementado

1. Escolha de período, manhã ou tarde.
2. Nome e turma da dupla, mais a escolha do comitê.
3. Países daquele comitê, com reserva temporária ao toque.
4. Revisão e confirmação da inscrição.

O navegador hoje demonstra a experiência. A concorrência real deve usar as funções do arquivo de migração do Supabase, nunca apenas o estado do JavaScript.

## Supabase

Execute [a migração](supabase/migrations/202608110001_onutec.sql) no projeto Supabase. Depois, importe as vagas em `event_slots`, criando uma linha para cada combinação de período, comitê e país. A lista atual contém 207 vagas por período, portanto 414 vagas com os dois turnos.

O frontend deverá chamar `reserve_event_slot` assim que o país for tocado e usar a data retornada para o cronômetro. No envio, chamará `confirm_event_registration` com o token local da visitante.
