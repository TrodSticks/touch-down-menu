import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, MessageSquare } from 'lucide-react';

const TDWaiter = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBubble(true);
      } else {
        setShowBubble(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSendMessage = async (msg = message) => {
    if (!msg.trim()) return;
    setIsTyping(true);
    setAiResponse('');
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msg }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      setAiResponse('Sorry, I am having trouble connecting. Please try again.');
    } finally {
      setIsTyping(false);
      setMessage('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Main Chat Bar */}
      <div 
        id="td-waiter-bar"
        className={`sticky top-0 z-20 w-full bg-white/95 backdrop-blur-sm shadow-lg border-t border-restaurant-beige-dark transition-transform duration-300 ${showBubble ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-restaurant-red mb-2">TD Waiter</h3>
              <p className="text-restaurant-wood opacity-80">Your AI assistant for the perfect dining experience</p>
            </div>
            <div className="flex items-center gap-3 mb-4 max-w-4xl mx-auto">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about our menu..."
                  className="w-full h-12 px-4 pr-12 text-lg border-2 border-restaurant-beige-dark focus:border-restaurant-red rounded-full bg-white/90"
                />
                <Button onClick={() => handleSendMessage()} disabled={!message.trim() || isTyping} className="h-12 w-12 rounded-full bg-restaurant-red hover:bg-restaurant-red-dark transition-colors flex-shrink-0" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
            </div>
            {(isTyping || aiResponse) && (
              <div className="max-w-4xl mx-auto mt-4 p-4 bg-restaurant-beige rounded-lg">
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-restaurant-red rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-restaurant-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-restaurant-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                    <span className="text-restaurant-wood text-sm">TD Waiter is thinking...</span>
                  </div>
                )}
                {aiResponse && !isTyping && (
                  <div className="flex items-start gap-3 text-left">
                      <Bot className="h-5 w-5 text-restaurant-red flex-shrink-0 mt-1" />
                      <p className="text-restaurant-wood">{aiResponse}</p>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-6">
                {[ "I want a heavy meal", "What's Jalapeños?", "Show me vegetarian options", "What's your signature dish?" ].map((suggestion, index) => (
                    <Button key={index} onClick={() => handleSuggestionClick(suggestion)} variant="outline" className="rounded-full px-4 py-2 text-sm border-restaurant-red text-restaurant-red hover:bg-restaurant-red hover:text-white">
                        {suggestion}
                    </Button>
                ))}
            </div>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 h-16 w-16 bg-restaurant-red rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ease-in-out z-30
                    ${showBubble ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        aria-label="Open AI Waiter"
      >
        <MessageSquare size={32} />
      </button>
    </>
  );
};

export default TDWaiter;
