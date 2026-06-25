const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "navLabels": false,
  "accent": "#1C6FE0"
}/*EDITMODE-END*/;

function FacturesTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.dataset.navlabels = t.navLabels ? "on" : "off";
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Barra de navegació" />
      <TweakToggle
        label="Etiquetes sota les icones"
        value={t.navLabels}
        onChange={(v) => setTweak('navLabels', v)}
      />
      <TweakSection label="Marca" />
      <TweakColor
        label="Color principal"
        value={t.accent}
        options={["#1C6FE0", "#174E96", "#1E4E40", "#9B86E0", "#F2855C"]}
        onChange={(v) => setTweak('accent', v)}
      />
    </TweaksPanel>
  );
}

const facturesTweaksRoot = document.createElement('div');
document.body.appendChild(facturesTweaksRoot);
ReactDOM.createRoot(facturesTweaksRoot).render(<FacturesTweaks />);
