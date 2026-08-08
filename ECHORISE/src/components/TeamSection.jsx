import { useState } from 'react'
import { TEAM, TEAM_DEPARTMENTS } from '../data'

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M4.5 16.5c-1.5 1-1.5 1-1.5 1s0 0 1-1.5l3-3M12 2S7 7 7 13l4 4c6 0 11-5 11-5L12 2z"/>
    <circle cx="15" cy="9" r="1"/>
  </svg>
)
const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)
const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
)
const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)
const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const DanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <circle cx="12" cy="3" r="2"/>
    <path d="M14 8.5l2.5 1.5-1 4 2 4h-2l-1.5-3.5-1.5 1V19h-2v-5l2-2.5V9.5l-2 1-1-1.5 3-2h1.5z"/>
    <path d="M8.5 9.5L6 11l1 1.5 1.5-1V19h2v-9z" opacity="0"/>
  </svg>
)

const DEPT_ICONS = {
  'Leadership':          { icon: '👑', color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Campaign Management': { icon: <RocketIcon />, color: '#FF6A00', bg: 'rgba(124,58,237,0.10)' },
  'Audience Growth':     { icon: <TrendingUpIcon />, color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Analytics & Strategy':{ icon: <BarChartIcon />, color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Artist Relations':    { icon: <MicIcon />, color: '#F97316', bg: 'rgba(249,115,22,0.10)' },
  'Finance':             { icon: <DollarIcon />, color: '#16A34A', bg: 'rgba(22,163,74,0.10)'  },
  'Operations':          { icon: '⚙️',  color: '#64748B', bg: 'rgba(100,116,139,0.10)'},
  'Dance Department':    { icon: <DanceIcon />, color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
}

export default function TeamSection() {
  const [activeDept, setActiveDept] = useState('All')

  const depts = ['All', ...TEAM_DEPARTMENTS]
  const filtered = activeDept === 'All' ? TEAM : TEAM.filter(m => m.dept === activeDept)

  return (
    <section className="py-24 px-6" id="team" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="section-label">The Team</span>
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>
            The Minds Behind <span className="grad-text">the Music</span>
          </h2>
          <p className="max-w-lg" style={{ color: '#6B6B6B' }}>
            35+ professionals across campaign management, analytics, audience growth, artist relations, operations, and dance promotion.
          </p>
        </div>

        {/* Department filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {depts.map(dept => {
            const meta = dept !== 'All' ? DEPT_ICONS[dept] : null
            const isActive = activeDept === dept
            return (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold transition-all duration-200"
                style={{
                  background: isActive
                    ? (meta ? meta.color : 'linear-gradient(135deg,#FF6A00,#FF6A00)')
                    : 'rgba(26,26,26,0.05)',
                  color: isActive ? '#FFFFFF' : '#6B6B6B',
                  border: isActive ? 'none' : '1.5px solid rgba(26,26,26,0.12)',
                  boxShadow: isActive ? '0 4px 16px rgba(255,106,0,0.25)' : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                {meta && <span>{meta.icon}</span>}
                {dept}
              </button>
            )
          })}
        </div>

        {/* Department heading when filtered */}
        {activeDept !== 'All' && DEPT_ICONS[activeDept] && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl" style={{ background: DEPT_ICONS[activeDept].bg, border: `1.5px solid ${DEPT_ICONS[activeDept].color}22` }}>
            <span className="text-2xl">{DEPT_ICONS[activeDept].icon}</span>
            <div>
              <div className="font-display font-bold text-sm" style={{ color: DEPT_ICONS[activeDept].color }}>{activeDept}</div>
              <div className="text-xs" style={{ color: 'rgba(26,26,26,0.28)' }}>{filtered.length} team member{filtered.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
        )}

        {/* All departments grouped view */}
        {activeDept === 'All' ? (
          <div className="flex flex-col gap-12">
            {TEAM_DEPARTMENTS.map(dept => {
              const members = TEAM.filter(m => m.dept === dept)
              const meta = DEPT_ICONS[dept]
              return (
                <div key={dept}>
                  {/* Dept label */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-lg">{meta.icon}</span>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase" style={{ color: meta.color }}>{dept}</h3>
                    <div className="flex-1 h-px ml-2" style={{ background: `${meta.color}25` }} />
                    <span className="text-xs font-display font-semibold px-2.5 py-0.5 rounded-full" style={{ background: meta.bg, color: meta.color }}>{members.length}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {members.map(member => (
                      <MemberCard key={`${member.name}-${member.role}`} member={member} meta={meta} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(member => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} meta={DEPT_ICONS[member.dept]} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MemberCard({ member, meta }) {
  return (
    <div className="glass-card p-5 text-center flex flex-col items-center gap-3 group">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-base text-white flex-shrink-0 bg-gradient-to-br ${member.gradient} transition-transform duration-200 group-hover:scale-110`}
        style={{ boxShadow: '0 4px 16px rgba(26,26,26,0.08)' }}>
        {member.initials}
      </div>
      <div>
        <div className="font-display font-bold text-sm leading-tight" style={{ color: '#1A1A1A' }}>{member.name}</div>
        <div className="text-xs mt-1 font-medium" style={{ color: meta.color }}>{member.role}</div>
      </div>
    </div>
  )
}
