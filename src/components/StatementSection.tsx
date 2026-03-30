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
          padding: '128px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <h2
          style={{
            fontSize: '84px',
            fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
            fontWeight: 500,
            color: '#17181B',
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-1.7px',
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
