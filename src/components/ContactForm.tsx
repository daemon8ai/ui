import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { useSearch } from '@tanstack/react-router'
import { Bug, HelpCircle, MessageSquare, Lightbulb, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { submitContact } from '#/lib/api'

const REASONS = [
  { id: 'bug', label: 'Report a Bug', desc: 'Something isn\'t working as expected', icon: Bug },
  { id: 'question', label: 'General Question', desc: 'Usage, compatibility, or setup help', icon: HelpCircle },
  { id: 'feedback', label: 'Feature Request', desc: 'Suggest an improvement or new capability', icon: Lightbulb },
  { id: 'other', label: 'Something Else', desc: 'Partnerships, press, or anything else', icon: MessageSquare },
] as const

type ReasonId = typeof REASONS[number]['id']

type ContactInfo = {
  name: string
  email: string
  company: string
}

type MessageData = {
  subject: string
  message: string
}

const STEP_LABELS = ['Reason', 'Details', 'Message']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export function ContactForm() {
  let contactReason: string | undefined
  try {
    const search = useSearch({ strict: false }) as Record<string, string | undefined>
    contactReason = search.contact_reason
  } catch {
    contactReason = undefined
  }

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [reason, setReason] = useState<ReasonId | ''>('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  useEffect(() => () => abortRef.current?.abort(), [])

  const contactForm = useForm<ContactInfo>({
    defaultValues: { name: '', email: '', company: '' },
    mode: 'onTouched',
  })

  const messageForm = useForm<MessageData>({
    defaultValues: { subject: '', message: '' },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (contactReason && REASONS.some(r => r.id === contactReason)) {
      setReason(contactReason as ReasonId)
      setStep(1)
    }
  }, [contactReason])

  const canProceed = [
    reason !== '',
    contactForm.formState.isValid && contactForm.getValues('name') && contactForm.getValues('email'),
    messageForm.formState.isValid && messageForm.getValues('message'),
  ]

  const goTo = (target: number) => {
    if (target > step && !canProceed[step]) return
    if (target > step) {
      if (step === 1) {
        contactForm.trigger().then(valid => {
          if (valid) { setDirection(1); setStep(target) }
        })
        return
      }
      if (step === 2) {
        messageForm.trigger().then(valid => {
          if (valid) { setDirection(1); setStep(target) }
        })
        return
      }
    }
    setDirection(target > step ? 1 : -1)
    setStep(target)
  }

  const next = () => {
    if (step === 0 && reason) {
      setDirection(1)
      setStep(1)
    } else if (step === 1) {
      contactForm.trigger().then(valid => {
        if (valid) { setDirection(1); setStep(2) }
      })
    } else if (step === 2) {
      if (submitting) return
      messageForm.trigger().then(async valid => {
        if (!valid || !reason) return
        setSubmitError(null)
        setSubmitting(true)

        const controller = new AbortController()
        abortRef.current = controller

        const contact = contactForm.getValues()
        const message = messageForm.getValues()

        try {
          await submitContact(
            {
              reason,
              name: contact.name.trim(),
              email: contact.email.trim(),
              company: contact.company.trim() || undefined,
              subject: message.subject.trim(),
              message: message.message.trim(),
            },
            controller.signal,
          )
          setSubmitted(true)
        } catch (err) {
          if ((err as { name?: string }).name === 'AbortError') return
          setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.')
        } finally {
          abortRef.current = null
          setSubmitting(false)
        }
      })
    }
  }

  const back = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-12 px-4"
      >
        <div className="w-12 h-12 rounded-full bg-d8-free/10 border border-d8-free/20 flex items-center justify-center mx-auto mb-4">
          <Check size={24} className="text-d8-free" />
        </div>
        <p className="text-[18px] text-d8-text mb-2" style={{ fontWeight: 500 }}>
          Message sent
        </p>
        <p className="text-[14px] text-d8-text-muted max-w-[360px] mx-auto">
          We'll get back to you at{' '}
          <span className="text-d8-text">{contactForm.getValues('email')}</span>{' '}
          as soon as possible.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-8">
        {STEP_LABELS.map((label, i) => {
          const isCompleted = i < step || (i === step && canProceed[i])
          const isCurrent = i === step
          const isClickable = i <= step || (i === step + 1 && canProceed[step])
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isClickable ? goTo(i) : undefined}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] transition-all duration-300 shrink-0 ${
                    isCurrent
                      ? 'bg-d8-primary text-d8-bg'
                      : isCompleted
                      ? 'bg-d8-primary/15 text-d8-primary border border-d8-primary/30'
                      : 'bg-d8-surface-2 text-d8-text-muted border border-d8-border'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {isCompleted && !isCurrent ? <Check size={12} /> : i + 1}
                </span>
                <span
                  className={`text-[13px] hidden sm:inline transition-colors duration-200 ${
                    isCurrent ? 'text-d8-text' : 'text-d8-text-muted'
                  }`}
                  style={{ fontWeight: isCurrent ? 500 : 400 }}
                >
                  {label}
                </span>
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div className={`flex-1 h-px mx-3 transition-colors duration-300 ${
                  i < step ? 'bg-d8-primary/30' : 'bg-d8-border'
                }`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="min-h-[320px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <p className="text-[15px] text-d8-text mb-4" style={{ fontWeight: 500 }}>
                What can we help with?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {REASONS.map((r) => {
                  const Icon = r.icon
                  const selected = reason === r.id
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setReason(r.id)
                        setDirection(1)
                        setStep(1)
                      }}
                      className={`text-left px-4 py-3.5 rounded-[6px] border transition-all duration-200 ${
                        selected
                          ? 'border-d8-primary/50 bg-d8-primary/5'
                          : 'border-d8-border bg-d8-surface-1 hover:border-d8-border-bright hover:bg-d8-surface-2'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <Icon size={15} className={selected ? 'text-d8-primary' : 'text-d8-text-muted'} />
                        <span className="text-[14px] text-d8-text" style={{ fontWeight: 500 }}>
                          {r.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-d8-text-muted leading-relaxed pl-[27px]">
                        {r.desc}
                      </p>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <form onSubmit={(e) => { e.preventDefault(); next() }}>
                <p className="text-[15px] text-d8-text mb-4" style={{ fontWeight: 500 }}>Your details</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] text-d8-text-muted tracking-[0.04em] mb-1.5">NAME <span className="text-d8-error">*</span></label>
                    <input
                      {...contactForm.register('name', { required: 'Name is required' })}
                      placeholder="Your name"
                      className="w-full px-4 h-11 bg-d8-surface-2 border border-d8-border-bright rounded-[4px] text-d8-text text-[14px] placeholder:text-d8-text-muted/40 focus:outline-none focus:border-d8-primary transition-colors duration-200"
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-[12px] text-d8-error mt-1">{contactForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] text-d8-text-muted tracking-[0.04em] mb-1.5">EMAIL <span className="text-d8-error">*</span></label>
                    <input
                      {...contactForm.register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 h-11 bg-d8-surface-2 border border-d8-border-bright rounded-[4px] text-d8-text text-[14px] placeholder:text-d8-text-muted/40 focus:outline-none focus:border-d8-primary transition-colors duration-200"
                    />
                    {contactForm.formState.errors.email && (
                      <p className="text-[12px] text-d8-error mt-1">{contactForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] text-d8-text-muted tracking-[0.04em] mb-1.5">COMPANY <span className="text-d8-text-muted/40 text-[11px]">(optional)</span></label>
                    <input
                      {...contactForm.register('company')}
                      placeholder="Company name"
                      className="w-full px-4 h-11 bg-d8-surface-2 border border-d8-border-bright rounded-[4px] text-d8-text text-[14px] placeholder:text-d8-text-muted/40 focus:outline-none focus:border-d8-primary transition-colors duration-200"
                    />
                  </div>
                </div>
                <button type="submit" className="hidden" />
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <form onSubmit={(e) => { e.preventDefault(); next() }}>
                <p className="text-[15px] text-d8-text mb-4" style={{ fontWeight: 500 }}>Your message</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] text-d8-text-muted tracking-[0.04em] mb-1.5">SUBJECT <span className="text-d8-error">*</span></label>
                    <input
                      {...messageForm.register('subject', { required: 'Subject is required' })}
                      placeholder="Brief summary"
                      className="w-full px-4 h-11 bg-d8-surface-2 border border-d8-border-bright rounded-[4px] text-d8-text text-[14px] placeholder:text-d8-text-muted/40 focus:outline-none focus:border-d8-primary transition-colors duration-200"
                    />
                    {messageForm.formState.errors.subject && (
                      <p className="text-[12px] text-d8-error mt-1">{messageForm.formState.errors.subject.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] text-d8-text-muted tracking-[0.04em] mb-1.5">MESSAGE <span className="text-d8-error">*</span></label>
                    <textarea
                      {...messageForm.register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Please write at least 10 characters' },
                      })}
                      placeholder="Describe your question, issue, or idea..."
                      rows={6}
                      className="w-full px-4 py-3 bg-d8-surface-2 border border-d8-border-bright rounded-[4px] text-d8-text text-[14px] placeholder:text-d8-text-muted/40 focus:outline-none focus:border-d8-primary transition-colors duration-200 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          next()
                        }
                      }}
                    />
                    {messageForm.formState.errors.message && (
                      <p className="text-[12px] text-d8-error mt-1">{messageForm.formState.errors.message.message}</p>
                    )}
                  </div>
                </div>
                {submitError && (
                  <p className="mt-3 text-[13px] text-d8-error leading-relaxed" role="alert">
                    {submitError}
                  </p>
                )}
                <button type="submit" className="hidden" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-d8-border">
        <button
          onClick={back}
          disabled={step === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-[14px] transition-all duration-200 ${
            step === 0
              ? 'text-d8-text-muted/30 cursor-not-allowed'
              : 'text-d8-text-muted hover:text-d8-text hover:bg-d8-surface-1'
          }`}
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          onClick={next}
          disabled={!canProceed[step] || submitting}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-[4px] text-[14px] transition-all duration-200 ${
            canProceed[step] && !submitting
              ? 'bg-d8-primary text-d8-bg hover:opacity-90'
              : 'bg-d8-surface-2 text-d8-text-muted/40 cursor-not-allowed border border-d8-border'
          }`}
          style={{ fontWeight: 600 }}
        >
          {step === 2
            ? submitting
              ? 'Sending...'
              : 'Send Message'
            : 'Continue'}
          {step < 2 && <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  )
}
