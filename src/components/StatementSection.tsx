export function StatementSection() {
  return (
    <section
      style={{
        backgroundColor: '#EFEFEF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background with fade */}
      <div className="grid-bg-light" />
      
      <div
        style={{
          padding: 'clamp(64px, 12vw, 128px) clamp(20px, 5vw, 60px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(32px, 8vw, 84px)',
            fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
            fontWeight: 500,
            color: '#17181B',
            lineHeight: 1.1,
            margin: '0 auto',
            letterSpacing: 'clamp(-0.5px, -0.02em, -1.7px)',
            maxWidth: '1100px',
          }}
        >
          Artificial Intelligence is changing the rules of business right now.
          <br />
          <span style={{ color: '#8D96FD' }}>
            Companies that wait will fall behind.
          </span>
        </h2>
      </div>
    </section>
  );
}
