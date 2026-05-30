import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { upload } from "@vercel/blob/client";
import "./styles.css";

const labels = { pdf: "PDF", pptx: "PPTX", docx: "DOCX", xlsx: "XLSX", md: "MD", png: "PNG", jpg: "JPG" };
const tableData = {
  zq: {
    logic: [["主逻辑", "AI 将 CAD 从绘图工具升级为设计 Copilot，打开设计生产力入口。"], ["支撑变量", "云化架构、工程知识结构化、AI 生成能力、试点客户验证。"], ["输出用途", "约束后续 Slide 的核心判断和页标题。"]],
    structure: [["核心逻辑", "先讲行业范式变化，再落到子虔产品与数据结构。"], ["行业章节", "工业软件生态圈、国产 CAD 弯道超车、云化 + AI 路径。"], ["公司章节", "公司基础、产品/数据/算法、成熟度路线图。"], ["财务与风险", "财务预测、试点闭环、商业化补强。"]],
    evidence: [["行业 02 -> 公司 09", "CAD 处于工业软件关键入口，对应公司定位和业务边界。"], ["行业 04 -> 公司 10", "云化高敏捷 + AI 高智能，对应产品、数据、算法结构。"], ["行业 08 -> 公司 12", "架构云化路径，对应产品成熟度和路线图。"]]
  },
  yhy: {
    logic: [["主逻辑", "端侧 AI 带动低功耗、低成本、可靠存储需求，2D NAND 有补位机会。"], ["支撑变量", "AI 存储资源迁移、需求刚性、MLC/eMMC 升级窗口、国产供应链验证。"], ["输出用途", "约束后续 Slide 的投资结论、证据强弱和风险边界。"]],
    structure: [["核心逻辑", "先讲边缘 AI 存储需求，再讲公司量产与交付能力。"], ["行业章节", "资源迁移、需求刚性、技术门槛。"], ["公司章节", "公司画像、SLC 量产、跨区域交付。"], ["财务与风险", "估值层次、下行风险矩阵。"]],
    evidence: [["行业 02 -> 公司 13", "端侧资源迁移，对应公司产品定位和能力画像。"], ["行业 04 -> 公司 14", "需求刚性，对应 SLC 量产与工程交付可靠性。"], ["行业 10 -> 公司 20", "技术与客户门槛，对应跨区域交付和客户支持能力。"]]
  }
};

function Badge({ children, blue }) {
  return <span className={blue ? "badge blue" : "badge"}>{children}</span>;
}

function imageSrc(item) {
  return item?.dataUrl || item?.url || "";
}

function Header({ page, setPage }) {
  const nav = [["home", "流程总览"], ["skills", "Skill 库"], ["cases", "项目案例"], ["library", "资料库"], ["upload", "上传"]];
  return (
    <header className="topbar">
      <b>CATL 投资部 AI 化展示站</b>
      <nav>{nav.map(([id, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}>{label}</button>)}</nav>
    </header>
  );
}

function Home({ data }) {
  const [step, setStep] = useState(null);
  const active = step || data.sop[0];
  const hero = data.visuals.find((v) => v.id === "sop-ui");
  const zq = data.visuals.find((v) => v.id === "zq-slide-01");
  const yhy = data.visuals.find((v) => v.id === "yhy-slide-01");
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI Investment Memo Workflow</p>
          <h1>把项目资料池转成可展示、可复盘、可继续迭代的立项报告生产线</h1>
          <p>页面不只讲方法，而是把输入材料、AI 处理过程、输出页面、PPT 文件和项目案例放在同一条证据链里，适合向领导展示投资团队 AI 化能力。</p>
          <div className="metrics">
            <span><b>{data.sop.length}</b>SOP 步骤</span>
            <span><b>{data.skills.length}</b>沉淀 Skill</span>
            <span><b>{data.cases.length}</b>项目案例</span>
            <span><b>{data.artifacts.length}</b>文件索引</span>
          </div>
        </div>
        <figure className="hero-visual">
          <img src={imageSrc(hero)} alt={hero?.title} />
          <figcaption>{hero?.title}</figcaption>
        </figure>
      </section>

      <section className="visual-strip">
        {[zq, yhy].filter(Boolean).map((item) => (
          <article className="visual-card large" key={item.id}>
            <img src={imageSrc(item)} alt={item.title} />
            <div><b>{item.title}</b><p>{item.description}</p></div>
          </article>
        ))}
      </section>

      <section className="flow">
        {data.sop.map((s) => (
          <button className={active?.id === s.id ? "node active" : "node"} key={s.id} onClick={() => setStep(s)}>
            <Badge blue>步骤 {s.order}</Badge>
            <strong>{s.shortTitle}</strong>
            <small>{s.title}</small>
          </button>
        ))}
      </section>

      {active && (
        <section className="panel">
          <h2>{active.title}</h2>
          <p>{active.description}</p>
          <div className="cols">
            <Info title="输入材料" items={active.inputs} />
            <Info title="AI / 人工动作" items={active.actions} />
            <Info title="输出结果" items={active.outputs} />
          </div>
        </section>
      )}
    </main>
  );
}

function Info({ title, items = [] }) {
  return <div className="info"><h3>{title}</h3><ul>{items.map((i) => <li key={i}>{i}</li>)}</ul></div>;
}

function Skills({ skills, visuals }) {
  const [id, setId] = useState(skills[0]?.id);
  const skill = skills.find((x) => x.id === id) || skills[0];
  const visual = visuals.find((v) => v.id === "skill-ui");
  return (
    <main className="page">
      <section className="split-head">
        <div><h1>AI Skill 库</h1><p>把反复试错后的规则固化为可复用能力：先组织投资逻辑，再生成 PPT 图片，最后组装成可传阅版本。</p></div>
        <img src={imageSrc(visual)} alt={visual?.title} />
      </section>
      <div className="tabs">{skills.map((x) => <button className={x.id === id ? "active" : ""} onClick={() => setId(x.id)} key={x.id}>{x.name}</button>)}</div>
      {skill && (
        <section className="panel">
          <Badge blue>{skill.stage}</Badge>
          <h2>{skill.name}</h2>
          <p>{skill.definition}</p>
          <div className="cols">
            <Info title="输入" items={skill.inputs} />
            <Info title="输出" items={skill.outputs} />
            <Info title="质量门槛" items={skill.qualityGates} />
          </div>
          <div className="cols two">
            <Info title="内部约束" items={skill.constraints} />
            <Info title="如何创建和调整" items={skill.creationAndTuning} />
          </div>
        </section>
      )}
    </main>
  );
}

function visualById(visuals, id) {
  return visuals.find((v) => v.id === id);
}

function Cases({ cases, artifacts, visuals }) {
  const [id, setId] = useState(cases[0]?.id);
  const project = cases.find((x) => x.id === id) || cases[0];
  const projectVisuals = visuals.filter((v) => v.group === id);
  const projectArtifacts = artifacts.filter((a) => a.projectId === project?.id);
  return (
    <main className="page">
      <section className="split-head">
        <div>
          <h1>项目案例复盘</h1>
          <p>每个案例按 SOP 对号入座：输入了什么、调用了什么 Skill、迭代了什么、最终输出了哪些页面和文件。</p>
        </div>
        <img src={imageSrc(visuals.find((v) => v.id === "case-ui"))} alt="案例视觉稿" />
      </section>
      <div className="tabs">{cases.map((x) => <button className={x.id === id ? "active" : ""} onClick={() => setId(x.id)} key={x.id}>{x.name}</button>)}</div>
      <section className="case">
        <aside>{project?.caseSteps?.map((s) => <a key={s.id}>{s.title}</a>)}</aside>
        <article className="panel">
          <h2>{project?.name}</h2>
          <p>{project?.summary}</p>
          <Badge>{project?.industry}</Badge>
          {project?.caseSteps?.map((s) => <div className="step" key={s.id}><h3>{s.title}</h3><p>{s.description}</p>{s.skillUsed?.map((k) => <Badge blue key={k}>{k}</Badge>)}</div>)}
        </article>
      </section>
      <CaseTables projectId={project?.id} />
      <ClosureMap visual={visuals.find((v) => v.id === "logic-closure-loop")} />
      <SectionedVisualGallery title={`${project?.shortName || ""}最终输出页面截图`} items={projectVisuals} />
      <ArtifactGallery artifacts={projectArtifacts} visuals={visuals} />
    </main>
  );
}

function CaseTables({ projectId }) {
  const rows = tableData[projectId];
  if (!rows) return null;
  const tables = [["投资逻辑框架", rows.logic], ["Slides 框架结构", rows.structure], ["逐页内容与证据表", rows.evidence]];
  return <section className="panel"><h2>三个 .md 文件的核心内容</h2><p>这里直接展示三个指导 PPT 图片生成的 .md 文件分别在做什么；附件点击仍保留 .md 标题，但打开为 PDF 展示版，便于投委现场浏览。</p><div className="table-grid">{tables.map(([title, data]) => <div className="mini-table" key={title}><h3>{title}</h3><table><tbody>{data.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table></div>)}</div></section>;
}

function ClosureMap({ visual }) {
  if (!visual) return null;
  return <section className="panel closure"><div><h2>行业逻辑与公司能力的闭环支撑</h2><p>行业章节不是孤立展示市场空间，核心作用是提出需求、技术路径和竞争门槛；公司章节对应证明产品能力、客户验证和交付成本，最后共同回到财务弹性与风险边界。</p></div><img src={imageSrc(visual)} alt={visual.title} /></section>;
}

function VisualGallery({ title, items }) {
  if (!items?.length) return null;
  return <section><h2>{title}</h2><div className="visual-grid">{items.map((item) => <article className="visual-card" key={item.id}><img src={imageSrc(item)} alt={item.title} /><b>{item.title}</b><p>{item.description}</p></article>)}</div></section>;
}

function SectionedVisualGallery({ title, items }) {
  if (!items?.length) return null;
  const sections = [["核心逻辑页", "核心逻辑页"], ["行业章节", "industry"], ["公司章节", "company"], ["财务与风险", "finance-risk"]];
  return <section><h2>{title}</h2>{sections.map(([label, key]) => {
    const group = items.filter((i) => i.section === key);
    if (!group.length) return null;
    return <div key={key} className="visual-section"><h3>{label}</h3><div className="visual-grid">{group.map((item) => <article className="visual-card" key={item.id}><img src={imageSrc(item)} alt={item.title} /><b>{item.title}</b><p>{item.description}</p></article>)}</div></div>;
  })}</section>;
}

function ArtifactGallery({ artifacts, visuals }) {
  if (!artifacts.length) return null;
  return <section><h2>相关产出文件</h2><div className="grid">{artifacts.map((a) => <ArtifactCard artifact={a} visuals={visuals} key={a.id} />)}</div></section>;
}

function ArtifactCard({ artifact, visuals }) {
  const visual = artifact.visualId ? visualById(visuals, artifact.visualId) : null;
  const href = artifact.url || (visual ? imageSrc(visual) : "");
  const pending = !href || href === "#blob-pending";
  const content = <>
    {visual ? <img className="thumb" src={imageSrc(visual)} alt={artifact.title} /> : <div className="file">{labels[artifact.displayFileType || artifact.fileType] || artifact.fileType}</div>}
    <b>{artifact.title}</b>
    <small>{artifact.description}</small>
    <Badge blue>{pending ? "暂未公开" : artifact.version || "可预览"}</Badge>
  </>;
  if (pending) return <article className="card pending">{content}</article>;
  return <a className="card" href={href} target="_blank" rel="noreferrer">{content}</a>;
}

function Library({ data }) {
  const [f, setF] = useState({ projectId: "all", fileType: "all" });
  const rows = useMemo(() => data.artifacts.filter((a) => (f.projectId === "all" || a.projectId === f.projectId) && (f.fileType === "all" || a.fileType === f.fileType)), [data.artifacts, f]);
  const types = [...new Set(data.artifacts.map((a) => a.fileType).filter(Boolean))];
  return (
    <main className="page">
      <h1>公开资料库</h1>
      <p>当前版本已把公开资料、PDF 展示版 .md、项目输出图和贴图版 PPT 放入静态资料库，可直接预览或下载。</p>
      <div className="filters">
        <select onChange={(e) => setF({ ...f, projectId: e.target.value })}><option value="all">全部项目</option>{data.cases.map((c) => <option value={c.id} key={c.id}>{c.name}</option>)}</select>
        <select onChange={(e) => setF({ ...f, fileType: e.target.value })}><option value="all">全部类型</option>{types.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div className="grid">{rows.map((a) => <ArtifactCard artifact={a} visuals={data.visuals} key={a.id} />)}</div>
    </main>
  );
}

function UploadPage() {
  const [status, setStatus] = useState("");
  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const files = [...form.getAll("files")].filter((x) => x?.name);
    try {
      for (const file of files) await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload-token" });
      setStatus(`已上传到 Vercel Blob：${files.length} 个文件`);
    } catch {
      setStatus("请先在 Vercel 配置 BLOB_READ_WRITE_TOKEN。");
    }
  }
  return <main className="page"><h1>公开上传</h1><form className="panel form" onSubmit={submit}><input name="files" type="file" multiple /><input name="projectId" placeholder="projectId" /><input name="sopStepId" placeholder="sopStepId" /><input name="title" placeholder="标题" /><button>上传到 Vercel Blob</button></form><p>{status}</p></main>;
}

function App() {
  const [page, setPage] = useState("home");
  const [data, setData] = useState({ sop: [], skills: [], cases: [], artifacts: [], visuals: [] });
  useEffect(() => {
    Promise.all([
      fetch("/data/frontend_data_contract.json").then((r) => r.json()),
      fetch("/data/asset_manifest.json").then((r) => r.json()),
      fetch("/data/visual_manifest.json").then((r) => r.json())
    ]).then(([contract, manifest, visualManifest]) => setData({
      sop: contract.sampleData.sopSteps,
      skills: contract.sampleData.skills,
      cases: contract.sampleData.caseProjects,
      artifacts: manifest.artifacts,
      visuals: visualManifest.visuals
    }));
  }, []);
  return <><Header page={page} setPage={setPage} />{page === "home" && <Home data={data} />}{page === "skills" && <Skills skills={data.skills} visuals={data.visuals} />}{page === "cases" && <Cases cases={data.cases} artifacts={data.artifacts} visuals={data.visuals} />}{page === "library" && <Library data={data} />}{page === "upload" && <UploadPage />}</>;
}

createRoot(document.getElementById("root")).render(<App />);
