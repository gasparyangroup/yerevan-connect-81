import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, FileText, ExternalLink, ChevronLeft, ChevronRight, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import type { Project } from '@/data/projects';
import { formatCurrency, formatNumber } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (project: Project, action: 'sponsor' | 'architect' | 'vote') => void;
}

// Placeholder API key for Gemini
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
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && project) {
      setSelectedImage(0);
      setChatMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your AI assistant for the "${project.title}" project. Ask me anything about this project, its timeline, budget, or impact on the community.`,
        },
      ]);
      setSelectedVote(null);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const getProgress = () => {
    if (project.stage === 'fundraising' && project.budget && project.raised) {
      return (project.raised / project.budget) * 100;
    }
    return 0;
  };

  const handleAIChat = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    // If no API key, show placeholder response
    if (!apiKey) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          role: 'assistant',
          content: `Thank you for your question about "${project.title}". This is a placeholder response. To enable AI responses, please add your Gemini API key to the apiKey variable in ProjectModal.tsx.

Based on the project context:
- Location: ${project.location}
- Stage: ${project.stage}
${project.budget ? `- Budget: ${formatCurrency(project.budget)}` : ''}
${project.raised ? `- Raised: ${formatCurrency(project.raised)}` : ''}

Feel free to ask more questions!`,
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
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI assistant helping users understand the urban project "${project.title}" in ${project.location}, Yerevan. 
                    
Project details:
- Description: ${project.description}
- Stage: ${project.stage}
${project.budget ? `- Budget: ${formatCurrency(project.budget)}` : ''}
${project.raised ? `- Raised so far: ${formatCurrency(project.raised)}` : ''}
${project.votes ? `- Current votes: ${project.votes}` : ''}

User question: ${message}

Provide a helpful, informative response about this specific project.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      
      const aiResponse: ChatMessage = { role: 'assistant', content: aiContent };
      setChatMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
      };
      setChatMessages((prev) => [...prev, errorResponse]);
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-background rounded-3xl overflow-hidden z-50 flex flex-col lg:flex-row"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column - Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              {/* Main Image with Gallery */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={project.gallery[selectedImage] || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {project.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {project.gallery.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {project.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Info */}
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {project.title}
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Documents */}
              {project.documents && project.documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Documents</h3>
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

              {/* Voting Options */}
              {project.stage === 'voting' && project.votingOptions && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Vote for your preferred design</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.votingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedVote(option.id)}
                        className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                          selectedVote === option.id
                            ? 'border-green-500 ring-2 ring-green-500/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="aspect-video">
                          <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-foreground text-sm">{option.name}</p>
                          <p className="text-xs text-muted-foreground">{formatNumber(option.votes)} votes</p>
                        </div>
                        {selectedVote === option.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-secondary/30 flex flex-col">
              <Tabs defaultValue="info" className="flex flex-col h-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                  <TabsTrigger
                    value="info"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                  >
                    Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                  >
                    AI Assistant
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="flex-1 p-6 mt-0">
                  {project.stage === 'fundraising' && project.budget && project.raised && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium text-foreground">{Math.round(getProgress())}%</span>
                        </div>
                        <Progress value={getProgress()} className="h-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-background">
                          <p className="text-xs text-muted-foreground mb-1">Raised</p>
                          <p className="font-semibold text-foreground">{formatCurrency(project.raised)}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-background">
                          <p className="text-xs text-muted-foreground mb-1">Goal</p>
                          <p className="font-semibold text-foreground">{formatCurrency(project.budget)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.stage === 'voting' && project.votes && (
                    <div className="p-4 rounded-2xl bg-background mb-6">
                      <p className="text-xs text-muted-foreground mb-1">Total Votes</p>
                      <p className="text-2xl font-bold text-foreground">{formatNumber(project.votes)}</p>
                    </div>
                  )}

                  <Button
                    className="w-full btn-gradient rounded-2xl h-12 text-base"
                    onClick={() => {
                      if (project.stage === 'fundraising') onAction(project, 'sponsor');
                      else if (project.stage === 'concept') onAction(project, 'architect');
                      else if (project.stage === 'voting') onAction(project, 'vote');
                    }}
                  >
                    {project.stage === 'fundraising' && 'Become a Sponsor'}
                    {project.stage === 'concept' && 'Submit as Architect'}
                    {project.stage === 'voting' && 'Cast Your Vote'}
                  </Button>
                </TabsContent>

                <TabsContent value="ai" className="flex-1 flex flex-col mt-0 min-h-0">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'assistant' ? 'bg-primary' : 'bg-secondary'
                          }`}
                        >
                          {msg.role === 'assistant' ? (
                            <Bot className="w-4 h-4 text-white" />
                          ) : (
                            <User className="w-4 h-4 text-foreground" />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.role === 'assistant'
                              ? 'bg-secondary text-foreground'
                              : 'bg-primary text-white'
                          }`}
                        >
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

                  {/* Chat Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about this project..."
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
