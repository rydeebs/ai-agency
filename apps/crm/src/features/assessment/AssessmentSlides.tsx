import { forwardRef } from "react";
import type { AssessmentReport } from "../../../convex/assessmentReport";
import "./assessmentSlides.css";

function SlideFrame({
  page,
  dark = false,
  children,
}: {
  page: number;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`assessment-slide${dark ? " assessment-slide--dark" : ""}`}
      data-assessment-slide
      aria-label={`Assessment page ${page} of 9`}
    >
      {children}
      <span className="assessment-slide__page">
        {String(page).padStart(2, "0")} / 09
      </span>
    </section>
  );
}

function SlideHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="assessment-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  );
}

export const AssessmentSlides = forwardRef<
  HTMLDivElement,
  { report: AssessmentReport }
>(function AssessmentSlides({ report }, ref) {
  return (
    <div ref={ref} className="assessment-deck">
      <SlideFrame page={1}>
        <div className="assessment-cover__mark">NEWREVGEN / AI ASSESSMENT</div>
        <div className="assessment-cover__title">
          <h1>
            AI Tools
            <br />
            <span>Assessment</span>
          </h1>
          <p>
            Prepared for <strong>{report.clientName}</strong>
          </p>
        </div>
        <div className="assessment-cover__meta">
          <div>
            <span>Assessment Date</span>
            <strong>{report.assessmentDate}</strong>
          </div>
          <div>
            <span>Business Type</span>
            <strong>{report.businessType}</strong>
          </div>
          <div>
            <span>Primary Focus</span>
            <strong>{report.primaryFocus}</strong>
          </div>
        </div>
      </SlideFrame>

      <SlideFrame page={2}>
        <SlideHeading
          eyebrow="Where we are · where we’re going"
          title="Executive Summary"
        />
        <div className="assessment-summary">
          <div className="assessment-summary__copy">
            <article className="assessment-card">
              <span>The Pain</span>
              <p>{report.executiveSummary.pain}</p>
            </article>
            <article className="assessment-card">
              <span>The Outcome</span>
              <p>{report.executiveSummary.outcome}</p>
            </article>
          </div>
          <div className="assessment-summary__stats">
            <article className="assessment-card assessment-card--lime">
              <strong>{report.executiveSummary.hoursReclaimed}</strong>
              <p>Hours you can reclaim every week</p>
            </article>
            <article className="assessment-card">
              <span>Primary Focus</span>
              <strong>{report.primaryFocus}</strong>
            </article>
          </div>
        </div>
      </SlideFrame>

      <SlideFrame page={3}>
        <SlideHeading eyebrow="Where the value is" title="Impact-Effort Matrix" />
        <div className="assessment-matrix-wrap">
          <div className="assessment-matrix__y">
            <span>High Impact</span>
            <span>Low Impact</span>
          </div>
          <div className="assessment-matrix">
            <article className="assessment-matrix__cell assessment-matrix__cell--lime">
              <h3>Quick Wins</h3>
              <div className="assessment-matrix__dots">
                {report.quickWins.map((_, index) => (
                  <span key={index}>{index + 1}</span>
                ))}
              </div>
              <p>High impact, low effort - this report focuses here.</p>
            </article>
            <article className="assessment-matrix__cell">
              <h3>Major Projects</h3>
              <p>High impact, high effort - phase these in after the wins.</p>
            </article>
            <article className="assessment-matrix__cell">
              <h3>Fill-Ins</h3>
              <p>Low impact, low effort - do them when time allows.</p>
            </article>
            <article className="assessment-matrix__cell">
              <h3>Ignore These</h3>
              <p>Low impact, high effort - not worth the time now.</p>
            </article>
          </div>
          <div className="assessment-matrix__x">
            <span>Low Effort</span>
            <span>Effort</span>
            <span>High Effort</span>
          </div>
        </div>
      </SlideFrame>

      <SlideFrame page={4}>
        <SlideHeading eyebrow="High impact, low effort" title="Quick Wins" />
        <div className="assessment-wins">
          {report.quickWins.map((win, index) => (
            <article key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{win.pain}</strong>
              <b>→</b>
              <p>{win.fix}</p>
            </article>
          ))}
        </div>
      </SlideFrame>

      <SlideFrame page={5}>
        <SlideHeading eyebrow="The tool stack" title="Recommended Solutions" />
        <div className="assessment-solutions">
          {report.solutions.map((solution, index) => (
            <article key={index}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{solution.tool}</h3>
              </header>
              <p>{solution.use}</p>
              <dl>
                <div>
                  <dt>Cost</dt>
                  <dd>{solution.cost}</dd>
                </div>
                <div>
                  <dt>Setup</dt>
                  <dd>{solution.setup}</dd>
                </div>
                <div>
                  <dt>Saves</dt>
                  <dd>{solution.saves}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </SlideFrame>

      <SlideFrame page={6} dark>
        <SlideHeading eyebrow="Start this week" title="Your 4-Day Quick Wins Plan" />
        <div className="assessment-plan">
          {report.fourDayPlan.map((day, index) => (
            <article key={index}>
              <span>{index + 1}</span>
              <h3>Day {['One', 'Two', 'Three', 'Four'][index]}</h3>
              <p>{day.task}</p>
              <small>
                Tool · <strong>{day.tool}</strong>
              </small>
            </article>
          ))}
        </div>
      </SlideFrame>

      <SlideFrame page={7}>
        <SlideHeading eyebrow="The next phase" title="What Comes After Quick Wins" />
        <div className="assessment-after">
          {report.nextPhase.map((item, index) => (
            <article key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              <p>{item.text}</p>
              <strong>{item.tool}</strong>
            </article>
          ))}
        </div>
      </SlideFrame>

      <SlideFrame page={8}>
        <SlideHeading eyebrow="The bottom line" title="Financial Impact" />
        <div className="assessment-financial">
          <article className="assessment-card assessment-card--lime">
            <span>Monthly Net ROI</span>
            <strong>{report.financialImpact.monthlyNetRoi}</strong>
            <p>{report.financialImpact.monthlyNetRoiCaption}</p>
          </article>
          <article className="assessment-card">
            <span>Weekly Time Returned</span>
            <strong>{report.financialImpact.weeklyTimeReturned}</strong>
            <p>{report.financialImpact.weeklyTimeCaption}</p>
          </article>
          <article className="assessment-card">
            <span>Total Monthly Tool Cost</span>
            <strong>{report.financialImpact.monthlyToolCost}</strong>
            <p>{report.financialImpact.monthlyToolCostCaption}</p>
          </article>
        </div>
      </SlideFrame>

      <SlideFrame page={9} dark>
        <SlideHeading eyebrow="Let’s get moving" title="Your Next Steps" />
        <div className="assessment-next-steps">
          {report.nextSteps.map((step, index) => (
            <article key={index}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.heading}</h3>
                <p>{step.detail}</p>
                {index === 1 ? <strong>Schedule Your Review Call →</strong> : null}
              </div>
            </article>
          ))}
        </div>
      </SlideFrame>
    </div>
  );
});
