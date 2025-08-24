import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function TypingAnimation({
  texts,
  className,
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetweenTexts = 2000,
  ...props
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (charIndex < currentFullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, erasingSpeed);
      } else {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, currentTextIndex, texts, typingSpeed, erasingSpeed, delayBetweenTexts]);

  return (
    <span className={cn('inline-block', className)} {...props}>
      {currentText}
    </span>
  );
}
