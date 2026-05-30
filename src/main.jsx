import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { upload } from "@vercel/blob/client";
import "./styles.css";

const labels = { pdf: "PDF", pptx: "PPTX", docx: "DOCX", xlsx: "XLSX", md: "MD", png: "PNG", jpg: "JPG" };
const tableData = {
  zq: {
    logic: [["一页投资逻辑总纲", "AI CAD 的价值从绘图效率工具升级为设计知识、工程规则和方案生成入口；子虔的云原生架构、数据结构和 AI Native 产品方向共同支撑设计 Copilot 机会。"], ["主逻辑 1", "工业软件入口价值仍在 CAD，但传统国产替代路径难以形成代际优势。"], ["主逻辑 2", "云化架构、意图/拓扑/几何数据和 AI 交互方式，是新一代 CAD 弯道超车的核心变量。"], ["主逻辑 3", "子虔需要证明产品能力、试点客户、工程数据闭环和商业化交付可持续。"]],
    structure: [["建议页序总表", "核心逻辑页 -> 行业章节 3 页 -> 公司章节 3 页 -> 财务与风险 2 页。"], ["行业章节", "先回答“为什么 CAD 会被 AI 重构、窗口在哪里、技术路径是什么”。"], ["公司章节", "再回答“子虔为什么具备抓住窗口的产品、数据、架构和客户验证”。"], ["财务与风险", "最后回到订单兑现、收入弹性、试点闭环和商业化补强。"]],
    evidence: [["行业图：工业软件生态", "可见内容模块：CAD 在工业软件链条中的入口位置；证据表要求：工业软件生态、CAD 工作流位置、CATL 设计链条需求。"], ["行业图：云化 + AI 路径", "可见内容模块：云化高敏捷叠加 AI 高智能；证据表要求：云端协同、意图数据、AI 生成能力。"], ["公司图：产品数据算法结构", "可见内容模块：产品、数据、算法结构完善；证据表要求：产品截图、架构说明、API/MCP、客户试点。"]]
  },
  yhy: {
    logic: [["一页投资逻辑总纲", "边缘 AI 推动存储资源从云端向端侧扩散，低功耗、可靠、可控供应的 2D NAND/嵌入式存储存在结构性窗口；扬贺扬的量产、客户和交付能力决定能否抓住窗口。"], ["主逻辑 1", "端侧 AI 设备增加本地存储需求，且部分下游更看重稳定、功耗、成本和供应安全。"], ["主逻辑 2", "2D NAND/MLC/eMMC 不是单纯低端替代，而受认证、良率、交付和客户导入周期约束。"], ["主逻辑 3", "扬贺扬需要用量产能力、客户穿透、跨区域交付和成本曲线证明窗口可兑现。"]],
    structure: [["建议页序总表", "核心逻辑页 -> 行业章节 3 页 -> 公司章节 3 页 -> 财务与风险 2 页。"], ["行业章节", "先回答“2D NAND 窗口期在哪些下游成立、为什么需求刚性、门槛是什么”。"], ["公司章节", "再回答“扬贺扬产品定位、量产能力和客户支持为什么能承接该窗口”。"], ["财务与风险", "最后回到估值层次、收入弹性和下行风险矩阵。"]],
    evidence: [["行业图：端侧迁移", "可见内容模块：AI 存储资源向端侧迁移；证据表要求：端侧设备、容量/功耗、边缘 AI 应用场景。"], ["行业图：需求刚性", "可见内容模块：不同下游对可靠性和供应安全的刚性需求；证据表要求：工控/AIoT/车载等客户访谈与产品规格。"], ["公司图：SLC 量产与交付", "可见内容模块：公司量产、工程交付与客户支持能力；证据表要求：量产进展、客户导入、区域交付和良率成本。"]]
  }
};
const relationData = {
  zq: [["行业：CAD 是工业软件入口", "公司：子虔业务定位与客户场景", "先证明入口足够关键，再证明子虔站在入口而不是外围工具。"], ["行业：云化 + AI 是弯道超车路径", "公司：产品/数据/算法结构", "行业页提出新路径，公司页证明自身底层结构与该路径匹配。"], ["行业：云原生架构通向 VibeCAD", "公司：产品成熟度路线图", "行业页定义终局，公司页证明从现有产品到 Copilot 的演进路线。"]],
  yhy: [["行业：AI 存储资源向端侧迁移", "公司：产品定位与公司画像", "先证明端侧新增需求，再证明扬贺扬产品正好卡在低功耗、可靠和成本位置。"], ["行业：不同下游需求刚性", "公司：SLC 量产与工程能力", "行业页讲清楚为什么客户必须要稳定供给，公司页证明公司有量产和交付基础。"], ["行业：MLC/eMMC 升级存在门槛", "公司：跨区域交付与客户支持", "行业页提出认证和客户导入门槛，公司页回应为什么扬贺扬能抓住窗口期。"]]
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
      <SectionedVisualGallery title={`${project?.shortName || ""}最终输出页面截图`} items={projectVisuals} />
      <ProjectEvidenceMap projectId={project?.id} />
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

function ProjectEvidenceMap({ projectId }) {
  const rows = relationData[projectId];
  if (!rows) return null;
  return <section className="panel"><h2>行业章节与公司章节的前后呼应关系</h2><p>行业页提出“为什么现在有窗口、窗口由什么变量驱动”；公司页必须逐条回应“为什么这个公司能承接这个窗口”，否则行业分析无法转化为投资判断。</p><div className="relation-grid">{rows.map(([industry, company, logic]) => <article className="relation-card" key={industry}><b>{industry}</b><span>对应</span><b>{company}</b><p>{logic}</p></article>)}</div></section>;
}

function VisualGallery({ title, items }) {
  if (!items?.length) return null;
  return <section><h2>{title}</h2><div className="visual-grid">{items.map((item) => <article className="visual-card" key={item.id}><img src={imageSrc(item)} alt={item.title} /><b>{item.title}</b><p>{item.description}</p></article>)}</div></section>;
}

function SectionedVisualGallery({ title, items }) {
  if (!items?.length) return null;
  const sections = [["核心逻辑页", "core"], ["行业章节", "industry"], ["公司章节", "company"], ["财务与风险", "finance-risk"]];
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
