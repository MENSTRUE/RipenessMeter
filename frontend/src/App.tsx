import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Camera, CheckCircle2, ChevronDown, CircleHelp, CloudUpload, FlaskConical, Github, Leaf, LoaderCircle, RotateCcw, ScanLine, ShieldCheck, Sparkles, X, AlertCircle, Activity } from 'lucide-react'

type Stage = 'unripe' | 'ripe' | 'overripe'
type Result = { prediction: Stage; confidence: number; uncertain: boolean; probabilities: { stage: Stage; probability: number }[]; disclaimer: string; model: string; filename: string }
type Ready = { ready: boolean; error?: string | null; best_epoch?: number | null }
const MAX_FILE = 8 * 1024 * 1024
const STAGES: { key: Stage; label: string; sub: string; color: string; symbol: string }[] = [
  { key: 'unripe', label: 'Unripe', sub: 'Green / semi-ripe', color: '#9dbb70', symbol: '01' },
  { key: 'ripe', label: 'Ripe', sub: 'Yellow / ready', color: '#f0c978', symbol: '02' },
  { key: 'overripe', label: 'Overripe', sub: 'Advanced ripening', color: '#c9967c', symbol: '03' },
]
const labelOf = (key: Stage) => STAGES.find(s => s.key === key)!

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [ready, setReady] = useState<Ready | null>(null)
  const [busy, setBusy] = useState(false)
  const [drag, setDrag] = useState(false)
  const [error, setError] = useState('')
  const [showMethod, setShowMethod] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const checkReady = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/ready')
      if (!response.ok) throw Error('API unavailable')
      setReady(await response.json() as Ready)
    } catch { setReady({ ready: false, error: 'Backend is offline. Start FastAPI on port 8000.' }) }
  }, [])
  useEffect(() => { void checkReady() }, [checkReady])
  useEffect(() => () => { abortRef.current?.abort(); if (preview) URL.revokeObjectURL(preview) }, [preview])

  const accept = (next?: File | null) => {
    if (!next) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type)) { setError('Use a JPG, PNG or WebP image.'); return }
    if (next.size > MAX_FILE) { setError('Image must be smaller than 8 MB.'); return }
    if (next.size === 0) { setError('Empty image cannot be analyzed.'); return }
    abortRef.current?.abort()
    if (preview) URL.revokeObjectURL(preview)
    setFile(next); setPreview(URL.createObjectURL(next)); setError(''); setResult(null)
  }
  const reset = () => {
    abortRef.current?.abort()
    if (preview) URL.revokeObjectURL(preview)
    setFile(null); setPreview(null); setResult(null); setError(''); setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }
  const analyze = async () => {
    if (!file || busy) return
    setBusy(true); setError(''); setResult(null)
    const controller = new AbortController(); abortRef.current = controller
    const timer = window.setTimeout(() => controller.abort(), 45000)
    try {
      const body = new FormData(); body.append('image', file)
      const response = await fetch('/api/v1/predict', { method: 'POST', body, signal: controller.signal })
      const data = await response.json()
      if (!response.ok) throw Error(typeof data.detail === 'string' ? data.detail : `Prediction failed (${response.status})`)
      setResult(data as Result)
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError((e as Error).message || 'Failed to analyze image.')
      else setError('Request timed out or was cancelled. Try again.')
    } finally { window.clearTimeout(timer); setBusy(false) }
  }
  const statusText = ready === null ? 'Connecting to model' : ready.ready ? 'Model online' : 'Model offline'

  return <div className="site">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="nav wrap">
      <a className="brand" href="#top" aria-label="RipenessMeter home"><div className="brand-icon"><Leaf size={21} strokeWidth={2.4}/></div><span>ripeness<span className="brand-accent">meter</span><span className="brand-dot">.</span></span></a>
      <nav className="nav-links"><a href="#analyzer">Analyzer</a><a href="#how">How it works</a><a href="#about">About</a></nav>
      <a className="github" href="https://github.com/MENSTRUE/RipenessMeter" target="_blank" rel="noreferrer"><Github size={17}/> <span>GitHub</span> <ArrowUpRight size={15}/></a>
    </header>

    <main id="top">
      <section className="hero wrap">
        <div className="eyebrow"><span className="pulse"/> OPEN-SOURCE COMPUTER VISION <span className="eyebrow-line"/> DAY 34 / 100</div>
        <h1>Every harvest<br/>has a <span>perfect moment.</span></h1>
        <p className="lead">A smarter way to understand banana ripeness. Upload a photo and get an instant visual maturity estimate powered by deep learning.</p>
        <div className="hero-actions"><a className="primary-link" href="#analyzer">Try the analyzer <ArrowRight size={18}/></a><a className="ghost-link" href="#how">Explore the process <ChevronDown size={17}/></a></div>
        <div className="hero-foot"><div className="hero-stat"><span className="stat-number">03</span><span>Ripeness stages</span></div><span className="separator"/><div className="hero-stat"><span className="stat-number">02</span><span>Research datasets</span></div><span className="separator"/><div className="hero-stat"><span className="stat-number">V3</span><span>Audited experiment</span></div></div>
        <div className="hero-art" aria-hidden="true"><div className="ring ring-a"/><div className="ring ring-b"/><div className="banana-art"><span>🍌</span></div><div className="art-label"><span className="art-label-dot"/> VISUAL RIPENESS INTELLIGENCE</div></div>
      </section>

      <section className="analyzer-area" id="analyzer"><div className="wrap"><div className="section-heading"><div><span className="kicker">THE ANALYSIS STUDIO</span><h2>See beyond the peel<span className="period">.</span></h2><p>One image. Three maturity stages. A clear, interpretable result.</p></div><div className={`model-status ${ready?.ready ? 'online' : 'offline'}`}><span className="status-dot"/><span>{statusText}</span><button type="button" onClick={() => void checkReady()} title="Refresh model status"><RotateCcw size={14}/></button></div></div>
        <div className="analysis-grid"><div className="upload-card"><div className="card-top"><div className="card-number">01 / IMAGE INPUT</div><div className="mini-tag">JPG · PNG · WEBP</div></div>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => accept(e.target.files?.[0])}/>
          {!preview ? <button type="button" className={`dropzone ${drag ? 'dragging' : ''}`} onClick={() => inputRef.current?.click()} onDragOver={e => {e.preventDefault();setDrag(true)}} onDragLeave={e => {e.preventDefault();setDrag(false)}} onDrop={e => {e.preventDefault();setDrag(false);accept(e.dataTransfer.files?.[0])}}><div className="upload-symbol"><CloudUpload size={34} strokeWidth={1.5}/></div><strong>Drop your banana photo here</strong><span>or click to browse your files</span><span className="limit">Maximum 8 MB · Single image</span></button> : <div className="preview-box"><img src={preview} alt="Uploaded banana preview"/><button className="close-preview" onClick={reset} title="Remove image"><X size={18}/></button><div className="preview-filename"><Camera size={15}/><span>{file?.name}</span><CheckCircle2 size={16}/></div></div>}
          <div className="upload-actions"><button className="analyze-btn" disabled={!file || busy || !ready?.ready} onClick={() => void analyze()}>{busy ? <><LoaderCircle size={19} className="spin"/> Analyzing...</> : <><ScanLine size={19}/> Analyze ripeness <ArrowRight size={18}/></>}</button>{file && <button className="reset-btn" onClick={reset} title="Clear selection"><RotateCcw size={18}/></button>}</div>
          <div className="upload-caption"><ShieldCheck size={16}/><span>Images are processed by your local API. No cloud storage is configured.</span></div>
          {error && <div className="error"><AlertCircle size={17}/>{error}</div>}
        </div>
        <div className="result-card"><div className="card-top"><div className="card-number">02 / INTELLIGENCE OUTPUT</div><div className="mini-tag">LIVE INFERENCE</div></div>
          {result ? <div className="real-result"><div className="result-eyebrow">PREDICTED RIPENESS STAGE</div><div className="result-main"><span className="result-indicator" style={{background:labelOf(result.prediction).color}}/><h3>{labelOf(result.prediction).label}</h3><span className="confidence">{(result.confidence*100).toFixed(1)}% confidence</span></div><p className="result-note">{labelOf(result.prediction).sub} · {result.uncertain ? 'Low-confidence result: consider a clearer photo.' : 'A visual classification estimate, not laboratory proof.'}</p><div className="probs">{STAGES.map(s => {const p=result.probabilities.find(x=>x.stage===s.key)?.probability ?? 0;return <div className="prob" key={s.key}><div className="prob-line"><span>{s.label}</span><strong>{(p*100).toFixed(1)}%</strong></div><div className="track"><div className="fill" style={{width:`${p*100}%`,background:s.color}}/></div></div>})}</div><div className="result-disclaimer"><CircleHelp size={16}/><span>{result.disclaimer}</span></div></div>
          : <div className="empty-result"><div className="radar"><div className="radar-orbit one"/><div className="radar-orbit two"/><Sparkles size={32} strokeWidth={1.4}/></div><h3>Your insight starts here.</h3><p>Upload an image and hit analyze to reveal its predicted ripeness stage and model confidence.</p><div className="empty-pills"><span>UNRIPE</span><span>RIPE</span><span>OVERRIPE</span></div></div>}
        </div></div>
        <div className="stages"><div className="stages-title"><Leaf size={16}/> THE THREE STAGES WE RECOGNIZE</div><div className="stage-list">{STAGES.map(s=><div key={s.key} className="stage"><div className="stage-color" style={{background:s.color}}/><span className="stage-num">{s.symbol}</span><div><b>{s.label}</b><small>{s.sub}</small></div><ArrowUpRight size={16}/></div>)}</div></div>
      </div></section>
      <section className="how wrap" id="how"><div className="section-heading how-heading"><div><span className="kicker">BEHIND THE PREDICTION</span><h2>Simple on the surface.<br/><span>Built on research.</span></h2></div></div><div className="steps"><div className="step"><div className="step-icon"><Camera size={23}/></div><span>STEP 01</span><h3>Capture</h3><p>Take a clear photo of one banana or banana crop under reasonable lighting.</p></div><div className="step"><div className="step-icon"><ScanLine size={23}/></div><span>STEP 02</span><h3>Analyze</h3><p>MobileNetV3-Small processes the image using the same evaluation preprocessing.</p></div><div className="step"><div className="step-icon"><Activity size={23}/></div><span>STEP 03</span><h3>Understand</h3><p>Review the predicted stage and model scores, with uncertainty disclosed.</p></div></div></section>
      <section className="about" id="about"><div className="wrap about-inner"><div><span className="kicker">TRANSPARENT BY DESIGN</span><h2>Built to assist,<br/>not to replace judgment.</h2><p>This academic prototype combines two labeled banana datasets and a documented leakage-screening workflow. It is not validated across every farm, camera, or lighting condition. The displayed confidence is not clinically or statistically calibrated.</p><button className="method-link" onClick={()=>setShowMethod(!showMethod)}><FlaskConical size={18}/>{showMethod?'Hide model notes':'Read model notes'}<ChevronDown size={17} style={{transform:showMethod?'rotate(180deg)':undefined}}/></button>{showMethod && <div className="method-panel">Three operational classes are predicted from 224×224 RGB input. The backbone is ImageNet-pretrained MobileNetV3-Small fine-tuned on BananaImageBD and annotated banana object crops. The V3 notebook quarantines visually similar cross-split samples. A low confidence score triggers a caution, but high confidence does not guarantee correctness.</div>}</div><div className="about-badge"><div className="badge-center"><Leaf size={40}/><b>100</b><span>DAYS OF<br/>PROJECTS</span></div></div></div></section>
    </main>
    <footer className="footer wrap"><div className="footer-brand"><span>ripeness<b>meter.</b></span><small>Day 34 / 100 — Built by Wafa Bila Syaefurokhman</small></div><span>Research prototype · Not a food quality certification</span><a href="https://github.com/MENSTRUE/RipenessMeter" target="_blank" rel="noreferrer">Source code <ArrowUpRight size={16}/></a></footer>
  </div>
}
export default App
