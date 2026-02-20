import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, FileText, ExternalLink, ChevronLeft, ChevronRight, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';
import { formatCurrency } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (project: Project, action: 'sponsor' | 'architect') => void;
}

const apiKey = '';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ProjectModal({ project, isOpen, onClose, onAction }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && project) {
      const title = lang === 'en' ? project.titleEn : lang === 'am' ? project.titleAm : project.title;
      setSelectedImage(0);
      setChatMessages([
        {
          role: 'assistant',
          content: `${t('aiGreeting')} "${title}".`,
        },
      ]);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const title = lang === 'en' ? project.titleEn : lang === 'am' ? project.titleAm : project.title;
  const location = lang === 'en' ? project.locationEn : lang === 'am' ? project.locationAm : project.location;
  const description = lang === 'en' ? project.descriptionEn : lang === 'am' ? project.descriptionAm : project.description;
  const problem = lang === 'en' ? project.problemEn : lang === 'am' ? project.problemAm : project.problem;
  const goal = lang === 'en' ? project.goalEn : lang === 'am' ? project.goalAm : project.goal;

  const handleAIChat = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    if (!apiKey) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          role: 'assistant',
          content: `Thank you for your question about "${title}". This is a demo response.\n\n- Location: ${location}\n- Stage: ${project.stage === 'sponsorship' ? t('navSponsorship') : t('navConcept')}\n${project.budget ? `- ${t('budget')}: ${formatCurrency(project.budget)}` : ''}`,
        };
        setChatMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an AI assistant for "${project.title}" in ${project.location}, Yerevan. Respond in ${lang === 'ru' ? 'Russian' : lang === 'am' ? 'Armenian' : 'English'}.\n\nProject: ${project.description}\nStage: ${project.stage}\n${project.budget ? `Budget: ${formatCurrency(project.budget)}` : ''}\n\nUser: ${message}`,
              }],
            }],
          }),
        }
      );
      const data = await response.json();
      const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, could not generate a response.';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAIChat(chatInput);
    }
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % project.gallery.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-background rounded-3xl overflow-hidden z-50 flex flex-col lg:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={project.gallery[selectedImage] || project.image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {project.gallery.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {project.gallery.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {project.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{title}</h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

              {problem && (
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('problem')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem}</p>
                </div>
              )}

              {goal && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">{t('goal')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{goal}</p>
                </div>
              )}

              {project.documents && project.documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">{t('documents')}</h3>
                  <div className="space-y-2">
                    {project.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="flex-1 text-foreground">{doc.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-secondary/30 flex flex-col">
              <Tabs defaultValue="info" className="flex flex-col h-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                  <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                    {t('info')}
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                    {t('aiAssistant')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="flex-1 p-6 mt-0">
                  {project.stage === 'sponsorship' && project.budget && (
                    <div className="space-y-4 mb-6">
                      <div className="p-4 rounded-2xl bg-background">
                        <p className="text-xs text-muted-foreground mb-1">{t('totalBudget')}</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(project.budget)}</p>
                      </div>
                      {project.presentationUrl && (
                        <a
                          href={project.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-foreground font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('openPresentation')}
                        </a>
                      )}
                    </div>
                  )}

                  <Button
                    className="w-full btn-gradient rounded-2xl h-12 text-base"
                    onClick={() => {
                      if (project.stage === 'sponsorship') onAction(project, 'sponsor');
                      else if (project.stage === 'concept') onAction(project, 'architect');
                    }}
                  >
                    {project.stage === 'sponsorship' && t('becomeSponsor')}
                    {project.stage === 'concept' && t('applyArchitect')}
                  </Button>
                </TabsContent>

                <TabsContent value="ai" className="flex-1 flex flex-col mt-0 min-h-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-primary' : 'bg-secondary'}`}>
                          {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-foreground" />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'assistant' ? 'bg-secondary text-foreground' : 'bg-primary text-white'}`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-secondary p-3 rounded-2xl">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('askAboutProject')}
                        className="flex-1 rounded-xl bg-background"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={() => handleAIChat(chatInput)}
                        disabled={!chatInput.trim() || isLoading}
                        size="icon"
                        className="btn-gradient rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
