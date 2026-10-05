import { FormEvent, ReactNode, useMemo, useRef, useState } from "react";

type Role = "student" | "teacher";
type Screen = "login" | "student" | "teacher";
type IconName =
  | "arrow"
  | "bell"
  | "book"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "download"
  | "eye"
  | "folder"
  | "home"
  | "logout"
  | "mail"
  | "menu"
  | "search"
  | "settings"
  | "upload"
  | "user"
  | "users";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18" /><rect x="3" y="4" width="18" height="18" rx="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
    download: <><path d="M12 3v12m0 0 5-5m-5 5-5-5" /><path d="M5 21h14" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">{paths[name]}</g>
    </svg>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <div className="brand-mark"><span>T</span></div>
      <div>
        <strong>TFC DIGITAL</strong>
        <small>Portal Acadêmico</small>
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    onLogin(role);
  }

  return (
    <main className="login-page">
      <section className="login-aside">
        <Brand light />
        <div className="aside-content">
          <div className="eyebrow"><span /> Sua jornada acadêmica</div>
          <h1>O último passo para uma grande conquista.</h1>
          <p>Entregue, acompanhe e conclua seu trabalho final em um só lugar.</p>
          <div className="quote-card">
            <div className="quote-mark">“</div>
            <p>O conhecimento é a única riqueza que se multiplica quando é compartilhada.</p>
            <div className="quote-author">
              <div className="author-line" />
              <span>Comunidade TFC DIGITAL</span>
            </div>
          </div>
        </div>
        <span className="aside-footer">© 2025 TFC DIGITAL</span>
        <div className="decor decor-one" />
        <div className="decor decor-two" />
      </section>

      <section className="login-panel">
        <div className="mobile-brand"><Brand /></div>
        <div className="login-box">
          <div className="login-heading">
            <span className="section-kicker">BEM-VINDO DE VOLTA</span>
            <h2>Acesse sua conta</h2>
            <p>Entre com suas credenciais institucionais.</p>
          </div>

          <div className="role-switch" role="tablist" aria-label="Tipo de acesso">
            <button className={role === "student" ? "active" : ""} onClick={() => setRole("student")} type="button">
              <Icon name="user" size={18} /> Aluno
            </button>
            <button className={role === "teacher" ? "active" : ""} onClick={() => setRole("teacher")} type="button">
              <Icon name="book" size={18} /> Professor
            </button>
          </div>

          <form onSubmit={submit}>
            <label className="field">
              <span>E-mail institucional</span>
              <div className="input-wrap">
                <Icon name="mail" size={18} />
                <input defaultValue={role === "student" ? "marina.silva@tfcdigital.edu.br" : "augusto.lima@tfcdigital.edu.br"} key={role} required type="email" />
              </div>
            </label>
            <label className="field">
              <span>Senha</span>
              <div className="input-wrap">
                <Icon name="user" size={18} />
                <input defaultValue="12345678" required type={showPassword ? "text" : "password"} />
                <button aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} className="input-action" onClick={() => setShowPassword(!showPassword)} type="button">
                  <Icon name="eye" size={18} />
                </button>
              </div>
            </label>
            <div className="form-options">
              <label className="check-label"><input type="checkbox" /> <span>Lembrar de mim</span></label>
              <button className="text-button" type="button">Esqueci minha senha</button>
            </div>
            <button className="primary-button" type="submit">
              Entrar como {role === "student" ? "aluno" : "professor"} <Icon name="arrow" />
            </button>
          </form>
          <div className="help-link"><span>Precisa de ajuda?</span><button type="button">Fale com o suporte acadêmico</button></div>
        </div>
      </section>
    </main>
  );
}

const studentNav = [
  { icon: "home" as IconName, label: "Visão geral" },
  { icon: "upload" as IconName, label: "Entregar trabalho" },
  { icon: "folder" as IconName, label: "Meus arquivos" },
];

const teacherNav = [
  { icon: "home" as IconName, label: "Visão geral" },
  { icon: "users" as IconName, label: "Trabalhos" },
  { icon: "calendar" as IconName, label: "Cronograma" },
];

function Shell({
  role,
  children,
  active,
  onNavigate,
  onLogout,
}: {
  role: Role;
  children: ReactNode;
  active: number;
  onNavigate: (index: number) => void;
  onLogout: () => void;
}) {
  const isStudent = role === "student";
  const nav = isStudent ? studentNav : teacherNav;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand light />
        <nav>
          <span className="nav-caption">MENU</span>
          {nav.map((item, index) => (
            <button className={active === index ? "active" : ""} key={item.label} onClick={() => onNavigate(index)} type="button">
              <Icon name={item.icon} size={19} /><span>{item.label}</span>
            </button>
          ))}
          <span className="nav-caption lower">CONTA</span>
          <button type="button"><Icon name="settings" size={19} /><span>Configurações</span></button>
          <button onClick={onLogout} type="button"><Icon name="logout" size={19} /><span>Sair</span></button>
        </nav>
        <div className="sidebar-help">
          <div><Icon name="book" size={20} /></div>
          <strong>Central de ajuda</strong>
          <p>Encontre respostas ou fale com a secretaria.</p>
          <button type="button">Acessar central <Icon name="arrow" size={15} /></button>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <button aria-label="Abrir menu" className="mobile-menu" type="button"><Icon name="menu" /></button>
          <div className="topbar-spacer" />
          <button aria-label="Notificações" className="notification" type="button"><Icon name="bell" size={20} /><span /></button>
          <div className="profile">
            <div className={`avatar ${isStudent ? "" : "teacher-avatar"}`}>{isStudent ? "MS" : "AL"}</div>
            <div><strong>{isStudent ? "Marina Silva" : "Prof. Augusto Lima"}</strong><small>{isStudent ? "Arquitetura e Urbanismo" : "Orientador • Arquitetura"}</small></div>
            <Icon name="chevron" size={15} />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  return <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties}><div><strong>{value}%</strong><span>concluído</span></div></div>;
}

function StudentDashboard({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState(0);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <Shell active={active} onLogout={onLogout} onNavigate={setActive} role="student">
      <main className="content">
        <div className="page-title">
          <div><span className="section-kicker">SEMESTRE 2025.1</span><h1>{active === 1 ? "Entregar trabalho" : "Olá, Marina!"}</h1><p>{active === 1 ? "Envie a versão final do seu Trabalho de Conclusão de Curso." : "Acompanhe o progresso do seu trabalho de conclusão."}</p></div>
          <div className="deadline-pill"><Icon name="clock" size={17} /><span>Prazo final</span><strong>28 jun, 23:59</strong></div>
        </div>

        {active === 1 ? (
          <section className="upload-page">
            <div className="section-heading"><div><span className="step-number">01</span><h2>Arquivo do trabalho</h2></div><p>Formato PDF, tamanho máximo de 30 MB.</p></div>
            <div className={`dropzone ${fileName ? "has-file" : ""}`} onClick={() => fileInput.current?.click()}>
              <input accept=".pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} ref={fileInput} type="file" />
              <div className="upload-icon"><Icon name={fileName ? "check" : "upload"} size={28} /></div>
              <h3>{fileName || "Arraste seu arquivo aqui"}</h3>
              <p>{fileName ? "Arquivo pronto para ser enviado" : "ou clique para selecionar do seu computador"}</p>
              {!fileName && <span>Selecionar arquivo</span>}
            </div>
            <div className="submission-note">
              <div><Icon name="document" /></div>
              <p><strong>Antes de enviar</strong><span>Confirme se o arquivo contém capa, folha de aprovação e referências. Após o prazo, não será possível substituir o documento.</span></p>
            </div>
            <div className="submit-row">
              <label className="check-label"><input required type="checkbox" /><span>Declaro que este trabalho é de minha autoria.</span></label>
              <button className="primary-button compact" disabled={!fileName || submitted} onClick={() => setSubmitted(true)} type="button">
                {submitted ? "Trabalho enviado" : "Confirmar entrega"} <Icon name={submitted ? "check" : "arrow"} />
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="student-grid">
              <article className="main-project-card">
                <div className="card-topline"><span>SEU TRABALHO</span><span className="status status-progress"><i /> Em desenvolvimento</span></div>
                <div className="project-main">
                  <div><span className="course-tag">TCC II • ARQUITETURA</span><h2>Habitação social e o direito à cidade: novas perspectivas urbanas</h2><div className="advisor"><div className="mini-avatar">AL</div><p><span>Orientador</span><strong>Prof. Augusto Lima</strong></p></div></div>
                  <ProgressRing value={72} />
                </div>
                <div className="milestone">
                  <div className="milestone-head"><span>Progresso das etapas</span><strong>3 de 5 concluídas</strong></div>
                  <div className="progress-line"><span /></div>
                  <div className="steps"><span className="done"><i><Icon name="check" size={12} /></i>Projeto</span><span className="done"><i><Icon name="check" size={12} /></i>Pesquisa</span><span className="done"><i><Icon name="check" size={12} /></i>Redação</span><span className="current"><i>4</i>Revisão</span><span><i>5</i>Entrega</span></div>
                </div>
              </article>

              <article className="deadline-card">
                <div className="deadline-date"><span>JUN</span><strong>28</strong></div>
                <span className="section-kicker">PRÓXIMA ENTREGA</span>
                <h3>Versão final do TCC</h3>
                <p>PDF • Máximo 30 MB</p>
                <div className="countdown"><div><strong>18</strong><span>dias</span></div><i>:</i><div><strong>09</strong><span>horas</span></div><i>:</i><div><strong>42</strong><span>min</span></div></div>
                <button className="primary-button compact" onClick={() => setActive(1)} type="button">Entregar trabalho <Icon name="arrow" /></button>
              </article>
            </section>

            <section className="bottom-grid">
              <div className="panel">
                <div className="panel-title"><div><h2>Últimas atividades</h2><p>Atualizações recentes do seu trabalho</p></div><button type="button">Ver todas</button></div>
                <div className="activity-list">
                  <div className="activity"><div className="activity-icon green"><Icon name="check" /></div><div><strong>Capítulo 3 aprovado</strong><p>Seu orientador aprovou a última versão.</p></div><time>Hoje, 10:24</time></div>
                  <div className="activity"><div className="activity-icon amber"><Icon name="document" /></div><div><strong>Comentário do orientador</strong><p>“Revise as referências da página 42.”</p></div><time>Ontem, 16:08</time></div>
                  <div className="activity"><div className="activity-icon blue"><Icon name="upload" /></div><div><strong>Arquivo enviado</strong><p>tcc_marina_v4.pdf • 12,4 MB</p></div><time>02 jun, 14:32</time></div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-title"><div><h2>Arquivos recentes</h2><p>Documentos do seu projeto</p></div><button type="button">Ver todos</button></div>
                <div className="file-list">
                  <div><span className="pdf-icon">PDF</span><p><strong>TCC_Marina_v4.pdf</strong><span>12,4 MB • 02 jun</span></p><button aria-label="Baixar arquivo" type="button"><Icon name="download" size={18} /></button></div>
                  <div><span className="pdf-icon doc">DOC</span><p><strong>Referências_revisadas.docx</strong><span>1,8 MB • 29 mai</span></p><button aria-label="Baixar arquivo" type="button"><Icon name="download" size={18} /></button></div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </Shell>
  );
}

const submissions = [
  { initials: "MS", name: "Marina Silva", title: "Habitação social e o direito à cidade", course: "Arquitetura", date: "02 jun, 14:32", status: "Em revisão" },
  { initials: "LC", name: "Lucas Costa", title: "Requalificação de espaços urbanos ociosos", course: "Arquitetura", date: "01 jun, 18:45", status: "Entregue" },
  { initials: "AF", name: "Ana Ferreira", title: "Biofilia aplicada a ambientes educacionais", course: "Design", date: "30 mai, 09:12", status: "Aprovado" },
  { initials: "RM", name: "Rafael Martins", title: "Mobilidade ativa em cidades de médio porte", course: "Urbanismo", date: "—", status: "Pendente" },
  { initials: "JS", name: "João Santos", title: "Patrimônio industrial e memória coletiva", course: "Arquitetura", date: "27 mai, 11:08", status: "Correções" },
];

function TeacherDashboard({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => submissions.filter((item) => `${item.name} ${item.title}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <Shell active={active} onLogout={onLogout} onNavigate={setActive} role="teacher">
      <main className="content">
        <div className="page-title">
          <div><span className="section-kicker">SEMESTRE 2025.1</span><h1>{active === 1 ? "Trabalhos orientados" : "Bom dia, Augusto!"}</h1><p>{active === 1 ? "Consulte, revise e acompanhe as entregas dos seus orientandos." : "Acompanhe as entregas e o progresso dos seus orientandos."}</p></div>
          <button className="outline-button" type="button"><Icon name="download" size={17} /> Exportar relatório</button>
        </div>

        <section className="stats-grid">
          <article><div className="stat-icon blue"><Icon name="users" /></div><div><span>ORIENTANDOS</span><strong>12</strong><small><b>+2</b> neste semestre</small></div></article>
          <article><div className="stat-icon amber"><Icon name="clock" /></div><div><span>AGUARDANDO REVISÃO</span><strong>4</strong><small>2 com prazo próximo</small></div></article>
          <article><div className="stat-icon green"><Icon name="check" /></div><div><span>TRABALHOS APROVADOS</span><strong>6</strong><small><b>50%</b> dos orientandos</small></div></article>
          <article><div className="stat-icon purple"><Icon name="calendar" /></div><div><span>PRÓXIMA BANCA</span><strong className="stat-date">14 jun</strong><small>Marina Silva • 14:00</small></div></article>
        </section>

        <section className="panel submissions-panel">
          <div className="table-toolbar">
            <div><h2>{active === 1 ? "Todos os trabalhos" : "Entregas recentes"}</h2><p>Gerencie os trabalhos dos seus orientandos</p></div>
            <div className="table-actions">
              <label className="search-box"><Icon name="search" size={18} /><input onChange={(e) => setQuery(e.target.value)} placeholder="Buscar aluno ou trabalho..." value={query} /></label>
              <select aria-label="Filtrar por status"><option>Todos os status</option><option>Em revisão</option><option>Aprovado</option><option>Pendente</option></select>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>ALUNO</th><th>TÍTULO DO TRABALHO</th><th>ENTREGA</th><th>STATUS</th><th /></tr></thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.name}>
                    <td><div className={`table-avatar color-${index}`}>{item.initials}</div><div><strong>{item.name}</strong><span>{item.course}</span></div></td>
                    <td><strong className="work-title">{item.title}</strong><span>TCC II • 2025.1</span></td>
                    <td><span className="date-cell">{item.date}</span></td>
                    <td><span className={`status status-${item.status.toLowerCase().replace(" ", "-").replace("õ", "o")}`}><i />{item.status}</span></td>
                    <td><button aria-label={`Abrir trabalho de ${item.name}`} className="row-action" type="button"><Icon name="chevron" size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer"><span>Exibindo {filtered.length} de 12 orientandos</span><button type="button">Ver todos os trabalhos <Icon name="arrow" size={16} /></button></div>
        </section>

        <section className="teacher-bottom">
          <article className="panel mini-panel">
            <div className="panel-title"><div><h2>Próximas bancas</h2><p>Agenda de apresentações</p></div><button type="button">Ver agenda</button></div>
            <div className="schedule-item"><div className="schedule-date"><span>JUN</span><strong>14</strong></div><div><strong>Marina Silva</strong><p>Habitação social e o direito à cidade</p><span><Icon name="clock" size={14} /> 14:00 — Sala B12</span></div></div>
            <div className="schedule-item"><div className="schedule-date pale"><span>JUN</span><strong>18</strong></div><div><strong>Lucas Costa</strong><p>Requalificação de espaços urbanos</p><span><Icon name="clock" size={14} /> 10:30 — Auditório 2</span></div></div>
          </article>
          <article className="panel mini-panel">
            <div className="panel-title"><div><h2>Prazos importantes</h2><p>Calendário acadêmico</p></div></div>
            <div className="timeline">
              <div><i className="green-dot" /><p><strong>Entrega da versão final</strong><span>28 de junho • 23:59</span></p><b>18 dias</b></div>
              <div><i className="gold-dot" /><p><strong>Fechamento das avaliações</strong><span>05 de julho • 18:00</span></p><b>25 dias</b></div>
              <div><i /><p><strong>Envio das atas</strong><span>08 de julho • 18:00</span></p><b>28 dias</b></div>
            </div>
          </article>
        </section>
      </main>
    </Shell>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  if (screen === "login") return <Login onLogin={(role) => setScreen(role)} />;
  if (screen === "student") return <StudentDashboard onLogout={() => setScreen("login")} />;
  return <TeacherDashboard onLogout={() => setScreen("login")} />;
}
