create temporary table desired_tarde_slots (
  committee text not null,
  country text not null,
  primary key (committee, country)
) on commit drop;

insert into desired_tarde_slots (committee, country)
values
  ('ONU Mulheres', 'Afeganistão'),
  ('ONU Mulheres', 'África do Sul'),
  ('ONU Mulheres', 'Alemanha'),
  ('ONU Mulheres', 'Arábia Saudita'),
  ('ONU Mulheres', 'Canadá'),
  ('ONU Mulheres', 'China'),
  ('ONU Mulheres', 'EUA'),
  ('ONU Mulheres', 'Índia'),
  ('ONU Mulheres', 'Japão'),
  ('ONU Mulheres', 'Noruega'),
  ('ONU Mulheres', 'Países Baixos'),
  ('ONU Mulheres', 'Reino Unido'),
  ('ONU Mulheres', 'Ucrânia'),
  ('ACNUDH', 'Alemanha'),
  ('ACNUDH', 'África do Sul'),
  ('ACNUDH', 'Bangladesh'),
  ('ACNUDH', 'Brasil'),
  ('ACNUDH', 'Chile'),
  ('ACNUDH', 'China'),
  ('ACNUDH', 'Coreia do Norte'),
  ('ACNUDH', 'Costa Rica'),
  ('ACNUDH', 'Cuba'),
  ('ACNUDH', 'França'),
  ('ACNUDH', 'Indonésia'),
  ('ACNUDH', 'Japão'),
  ('ACNUDH', 'Países Baixos'),
  ('OMS', 'África do Sul'),
  ('OMS', 'Alemanha'),
  ('OMS', 'Argentina'),
  ('OMS', 'Brasil'),
  ('OMS', 'Canadá'),
  ('OMS', 'China'),
  ('OMS', 'Cuba'),
  ('OMS', 'França'),
  ('OMS', 'Itália'),
  ('OMS', 'Japão'),
  ('OMS', 'Reino Unido'),
  ('OMS', 'Rússia'),
  ('OMS', 'Suíça'),
  ('UNODA', 'Alemanha'),
  ('UNODA', 'Brasil'),
  ('UNODA', 'China'),
  ('UNODA', 'Coreia do Norte'),
  ('UNODA', 'EUA'),
  ('UNODA', 'França'),
  ('UNODA', 'Irã'),
  ('UNODA', 'Israel'),
  ('UNODA', 'Japão'),
  ('UNODA', 'Reino Unido'),
  ('UNODA', 'República Democrática do Congo'),
  ('UNODA', 'Rússia'),
  ('UNODA', 'Ucrânia'),
  ('CSNU', 'África do Sul'),
  ('CSNU', 'Brasil'),
  ('CSNU', 'China'),
  ('CSNU', 'EUA'),
  ('CSNU', 'França'),
  ('CSNU', 'Haiti'),
  ('CSNU', 'Índia'),
  ('CSNU', 'Israel'),
  ('CSNU', 'Japão'),
  ('CSNU', 'Reino Unido'),
  ('CSNU', 'Rússia'),
  ('CSNU', 'Sudão'),
  ('CSNU', 'Ucrânia'),
  ('ACNUR', 'Afeganistão'),
  ('ACNUR', 'Alemanha'),
  ('ACNUR', 'Bangladesh'),
  ('ACNUR', 'Colômbia'),
  ('ACNUR', 'EUA'),
  ('ACNUR', 'Itália'),
  ('ACNUR', 'México'),
  ('ACNUR', 'Polônia'),
  ('ACNUR', 'Quênia'),
  ('ACNUR', 'Sudão'),
  ('ACNUR', 'Turquia'),
  ('ACNUR', 'Uganda'),
  ('ACNUR', 'Venezuela'),
  ('CCP', 'Brasil'),
  ('CCP', 'China'),
  ('CCP', 'Colômbia'),
  ('CCP', 'El Salvador'),
  ('CCP', 'Emirados Árabes Unidos'),
  ('CCP', 'Equador'),
  ('CCP', 'EUA'),
  ('CCP', 'Filipinas'),
  ('CCP', 'Itália'),
  ('CCP', 'México'),
  ('CCP', 'Nigéria'),
  ('CCP', 'Países Baixos'),
  ('CCP', 'Tailândia'),
  ('FAO', 'Alemanha'),
  ('FAO', 'Argentina'),
  ('FAO', 'Brasil'),
  ('FAO', 'China'),
  ('FAO', 'Costa Rica'),
  ('FAO', 'Egito'),
  ('FAO', 'EUA'),
  ('FAO', 'França'),
  ('FAO', 'Haiti'),
  ('FAO', 'Índia'),
  ('FAO', 'Reino Unido'),
  ('FAO', 'Rússia'),
  ('FAO', 'Ucrânia'),
  ('UNICEF', 'Alemanha'),
  ('UNICEF', 'Brasil'),
  ('UNICEF', 'China'),
  ('UNICEF', 'EUA'),
  ('UNICEF', 'Equador'),
  ('UNICEF', 'Espanha'),
  ('UNICEF', 'França'),
  ('UNICEF', 'Índia'),
  ('UNICEF', 'Irlanda'),
  ('UNICEF', 'Nigéria'),
  ('UNICEF', 'Noruega'),
  ('UNICEF', 'Reino Unido'),
  ('UNICEF', 'Suíça'),
  ('UNESCO', 'África do Sul'),
  ('UNESCO', 'China'),
  ('UNESCO', 'Egito'),
  ('UNESCO', 'EUA'),
  ('UNESCO', 'Finlândia'),
  ('UNESCO', 'França'),
  ('UNESCO', 'Índia'),
  ('UNESCO', 'Israel'),
  ('UNESCO', 'Itália'),
  ('UNESCO', 'Japão'),
  ('UNESCO', 'México'),
  ('UNESCO', 'Peru'),
  ('UNESCO', 'Ucrânia');

do $$
begin
  if exists (
    select 1
    from public.event_slots es
    join public.registrations r on r.slot_id = es.id
    left join desired_tarde_slots ds
      on ds.committee = es.committee
     and ds.country = es.country
    where es.period = 'Tarde'
      and ds.committee is null
  ) then
    raise exception 'Existem inscrições vinculadas a comitês/países obsoletos do período da Tarde. Resolva essas inscrições antes de aplicar a atualização.';
  end if;
end $$;

delete from public.slot_reservations sr
using public.event_slots es
left join desired_tarde_slots ds
  on ds.committee = es.committee
 and ds.country = es.country
where sr.slot_id = es.id
  and es.period = 'Tarde'
  and ds.committee is null;

delete from public.event_slots es
using (
  select es_inner.id
  from public.event_slots es_inner
  left join desired_tarde_slots ds
    on ds.committee = es_inner.committee
   and ds.country = es_inner.country
  where es_inner.period = 'Tarde'
    and ds.committee is null
) obsolete
where es.id = obsolete.id;

insert into public.event_slots (period, committee, country)
select 'Tarde', ds.committee, ds.country
from desired_tarde_slots ds
on conflict (period, committee, country) do nothing;
