import { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Layers,
  Play,
  HelpCircle,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  X,
  FileText,
} from 'lucide-react';
import {
  STORIES_DATA,
  TRADITIONS_DATA,
  VIDEOS_DATA,
  QUIZ_DATA,
} from '../../data/mockData';
import TraditionCard from '../../components/common/TraditionCard';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const GUIDES_DATA = [
  {
    id: 'guide-1',
    title: "The Connoisseur's Guide to Authentic GI Handlooms",
    category: "Textiles & Preservation",
    duration: "12 min read",
    author: "National Crafts Council",
    description: "Learn how to examine warp and weft counts, identify hand-spun khadi vs mill yarn, and verify GI tag provenance numbers.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    tags: ["Handloom", "GI Tag", "Conservation"],
  },
  {
    id: 'guide-2',
    title: "Terracotta Care & Preservation Handbook",
    category: "Earthen Crafts",
    duration: "8 min read",
    author: "Gorakhpur Artisan Guild",
    description: "Essential care practices for unglazed natural terracotta, seasonal humidity shielding, and traditional natural oil sealing techniques.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80",
    tags: ["Pottery", "Care Guide", "Clay Art"],
  },
  {
    id: 'guide-3',
    title: "Natural Dye Chemistry: Mineral & Plant Pigments",
    category: "Material Science",
    duration: "15 min read",
    author: "Kutch Craft Foundation",
    description: "A comprehensive breakdown of traditional mordants, fermenting indigo, pomegranate rind yellows, and madder root reds.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    tags: ["Natural Dyes", "Sustainability", "Ajrakh"],
  },
  {
    id: 'guide-4',
    title: "Ethical Cultural Tourism & Atelier Etiquette",
    category: "Heritage Travel",
    duration: "10 min read",
    author: "Ministry of Culture Fellow",
    description: "Respectful guidelines when visiting generational master artisan homes, photography permissions, and directly supporting artisan clusters.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    tags: ["Heritage Tourism", "Ethics", "Clusters"],
  },
];

const Learn = () => {
  const { traditions: contextTraditions } = useApp();
  const traditionsList = (contextTraditions && contextTraditions.length > 0)
    ? contextTraditions
    : TRADITIONS_DATA;

  const [activeTab, setActiveTab] = useState('stories');

  // Story Reader Modal State
  const [selectedStory, setSelectedStory] = useState(null);

  // Video Player Modal State
  const [activeVideo, setActiveVideo] = useState(null);

  // Interactive Heritage Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Handle quiz option select
  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);
    if (idx === QUIZ_DATA[quizIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < QUIZ_DATA.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQ = QUIZ_DATA[quizIndex];

  return (
    <div className="learn-page">
      {/* ─── Hero Banner ──────────────────────────────────────────────── */}
      <section className="learn-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
        <div className="page-container">
          <div className="learn-hero-badge">
            <GraduationCap size={16} />
            <span>Indigenous Knowledge Systems & Living Heritage</span>
          </div>
          <h1 className="learn-hero-title">Learn</h1>
          <p className="learn-hero-subtitle">
            Deepen your understanding of India's living cultural traditions through oral chronicles,
            material science, masterclass documentaries, and interactive heritage challenges.
          </p>

          {/* Tab Navigation */}
          <div className="learn-tabs-nav">
            <button
              className={`learn-tab-pill ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              <BookOpen size={16} />
              <span>Cultural Stories</span>
            </button>
            <button
              className={`learn-tab-pill ${activeTab === 'crafts' ? 'active' : ''}`}
              onClick={() => setActiveTab('crafts')}
            >
              <Layers size={16} />
              <span>Crafts & Traditions</span>
            </button>
            <button
              className={`learn-tab-pill ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <Play size={16} />
              <span>Videos</span>
            </button>
            <button
              className={`learn-tab-pill ${activeTab === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveTab('guides')}
            >
              <FileText size={16} />
              <span>Guides</span>
            </button>
            <button
              className={`learn-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <HelpCircle size={16} />
              <span>Heritage Quiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Main Content Tabs ────────────────────────────────────────── */}
      <section className="learn-content-section">
        <div className="page-container">
          {/* TAB 1: CULTURAL STORIES */}
          {activeTab === 'stories' && (
            <div className="stories-tab-pane">
              <div className="tab-pane-heading">
                <h2>Illustrated Cultural Chronicles</h2>
                <p>Archiving the oral histories, ritual symbols, and generational journeys behind Indian folk arts.</p>
              </div>

              <div className="stories-grid-2">
                {STORIES_DATA.map((story) => (
                  <div key={story.id} className="cultural-story-card">
                    <div className="story-card-thumb-wrap">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="story-card-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="story-region-badge">
                        <MapPin size={12} />
                        <span>{story.region}</span>
                      </div>
                    </div>

                    <div className="story-card-body">
                      <div className="story-meta-line">
                        <span className="story-tradition-tag">{story.tradition}</span>
                        <div className="story-reading-time">
                          <Clock size={12} />
                          <span>{story.readingTime}</span>
                        </div>
                      </div>

                      <h3 className="story-card-title">{story.title}</h3>
                      <p className="story-card-excerpt">{story.shortDescription}</p>

                      <div className="story-card-footer">
                        <span className="story-author-cite">{story.author}</span>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedStory(story)}
                        >
                          Read Chronicle <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CRAFTS & TRADITIONS */}
          {activeTab === 'crafts' && (
            <div className="crafts-tab-pane">
              <div className="tab-pane-heading">
                <h2>Comprehensive Living Traditions Index</h2>
                <p>Catalog of indigenous material knowledge, natural pigments, antiquity timelines, and risk assessments.</p>
              </div>

              <div className="traditions-grid-3">
                {traditionsList.map((tradition) => (
                  <TraditionCard key={tradition.id || tradition._id} tradition={tradition} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MASTERCLASS VIDEOS */}
          {activeTab === 'videos' && (
            <div className="videos-tab-pane">
              <div className="tab-pane-heading">
                <h2>Masterclass Documentaries & Studio Residencies</h2>
                <p>Short film archives capturing the authentic atelier environments of master craftspeople.</p>
              </div>

              <div className="videos-grid-2">
                {VIDEOS_DATA.map((vid) => (
                  <div key={vid.id} className="video-card-item">
                    <div
                      className="video-thumbnail-wrap"
                      onClick={() => setActiveVideo(vid)}
                    >
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="video-thumb-img"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="video-play-overlay">
                        <div className="play-button-circle">
                          <Play size={24} fill="#ffffff" color="#ffffff" />
                        </div>
                      </div>
                      <span className="video-duration-pill">{vid.duration}</span>
                    </div>

                    <div className="video-card-info">
                      <span className="video-craft-tag">{vid.craft}</span>
                      <h4 className="video-title" onClick={() => setActiveVideo(vid)}>
                        {vid.title}
                      </h4>
                      <p className="video-artisan-name">Featuring {vid.artisan}</p>
                      <span className="video-views-count">{vid.views} cultural views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GUIDES & MANUALS (Screen 9 Spec) */}
          {activeTab === 'guides' && (
            <div className="guides-tab-pane">
              <div className="tab-pane-heading">
                <h2>Craft Guides & Field Manuals</h2>
                <p>Curated collector manuals, authentic GI verification methodologies, and material care instructions.</p>
              </div>

              <div className="stories-grid-2">
                {GUIDES_DATA.map((guide) => (
                  <div key={guide.id} className="cultural-story-card">
                    <div className="story-card-thumb-wrap">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="story-card-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="story-region-badge">
                        <span>{guide.category}</span>
                      </div>
                    </div>

                    <div className="story-card-body">
                      <div className="story-meta-line">
                        <div className="story-reading-time">
                          <Clock size={12} />
                          <span>{guide.duration}</span>
                        </div>
                      </div>

                      <h3 className="story-card-title">{guide.title}</h3>
                      <p className="story-card-excerpt">{guide.description}</p>

                      <div className="story-card-footer">
                        <span className="story-author-cite">{guide.author}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {guide.tags.map((t) => (
                            <span key={t} className="badge badge-outline" style={{ fontSize: '0.75rem' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HERITAGE QUIZ & ACTIVITIES */}
          {activeTab === 'quiz' && (
            <div className="quiz-tab-pane">
              <div className="quiz-container-box">
                {!quizFinished ? (
                  <>
                    <div className="quiz-header">
                      <div className="quiz-badge">
                        <Sparkles size={14} />
                        <span>Cultural Knowledge Challenge</span>
                      </div>
                      <span className="quiz-progress-text">
                        Question <strong>{quizIndex + 1}</strong> of {QUIZ_DATA.length}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="quiz-progress-track">
                      <div
                        className="quiz-progress-fill"
                        style={{
                          width: `${((quizIndex + 1) / QUIZ_DATA.length) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Question */}
                    <h3 className="quiz-question-text">{currentQ.question}</h3>

                    {/* Options */}
                    <div className="quiz-options-list">
                      {currentQ.options.map((opt, idx) => {
                        let btnClass = 'quiz-option-btn';
                        if (isAnswerSubmitted) {
                          if (idx === currentQ.correctAnswer) {
                            btnClass += ' correct';
                          } else if (idx === selectedAnswer) {
                            btnClass += ' incorrect';
                          }
                        } else if (selectedAnswer === idx) {
                          btnClass += ' selected';
                        }

                        return (
                          <button
                            key={idx}
                            className={btnClass}
                            onClick={() => handleSelectOption(idx)}
                            disabled={isAnswerSubmitted}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                            <span className="option-text">{opt}</span>
                            {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                              <CheckCircle2 size={18} className="option-icon text-forest" />
                            )}
                            {isAnswerSubmitted && idx === selectedAnswer && idx !== currentQ.correctAnswer && (
                              <XCircle size={18} className="option-icon text-red" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {isAnswerSubmitted && (
                      <div className="quiz-explanation-box">
                        <strong>Cultural Context:</strong>
                        <p>{currentQ.explanation}</p>
                      </div>
                    )}

                    {/* Footer / Next Question Button */}
                    <div className="quiz-footer">
                      <div className="current-score-pill">
                        Current Score: <strong>{score}</strong>
                      </div>
                      {isAnswerSubmitted && (
                        <button
                          className="btn btn-primary btn-md"
                          onClick={handleNextQuestion}
                        >
                          {quizIndex === QUIZ_DATA.length - 1
                            ? 'See Your Results'
                            : 'Next Question'}{' '}
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Quiz Result Screen */
                  <div className="quiz-result-view">
                    <div className="result-award-icon">
                      <Award size={64} className="text-gold" />
                    </div>
                    <h2>Heritage Challenge Complete!</h2>
                    <p className="result-score-highlight">
                      You scored <strong>{score}</strong> out of {QUIZ_DATA.length}
                    </p>

                    <div className="result-badge-card">
                      <span className="badge-type">Awarded Distinction</span>
                      <h4>
                        {score === 5
                          ? '🌟 Master Heritage Scholar'
                          : score >= 3
                          ? '🎨 Dedicated Cultural Guardian'
                          : '🌱 Heritage Apprentice'}
                      </h4>
                      <p>
                        {score === 5
                          ? 'Exceptional mastery of Indian folk arts, metallurgy origins, and GI protected craft systems!'
                          : 'Great effort in exploring India’s intangible cultural legacy. Explore masterclasses to deepen your knowledge!'}
                      </p>
                    </div>

                    <div className="result-actions-row">
                      <button className="btn btn-primary" onClick={handleResetQuiz}>
                        <RotateCcw size={16} /> Try Challenge Again
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => setActiveTab('stories')}
                      >
                        Read Cultural Stories
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Cultural Story Reader Modal ───────────────────────────────── */}
      {selectedStory && (
        <div className="modal-backdrop">
          <div className="modal-dialog story-reader-modal">
            <div className="modal-header">
              <div>
                <span className="modal-badge">{selectedStory.tradition} · {selectedStory.region}</span>
                <h3 className="modal-title">{selectedStory.title}</h3>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedStory(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="story-reader-body">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="story-reader-hero-img"
              />

              <div className="story-reader-meta">
                <span>By {selectedStory.author}</span>
                <span>•</span>
                <span>{selectedStory.readingTime}</span>
              </div>

              <div className="story-reader-text">
                {selectedStory.fullStory.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedStory(null)}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Video Player Modal ────────────────────────────────────────── */}
      {activeVideo && (
        <div className="modal-backdrop">
          <div className="modal-dialog video-player-modal">
            <div className="modal-header">
              <div>
                <span className="modal-badge">{activeVideo.craft}</span>
                <h3 className="modal-title">{activeVideo.title}</h3>
              </div>
              <button
                className="modal-close"
                onClick={() => setActiveVideo(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="video-player-body">
              <div className="video-embed-container">
                <div className="video-demo-placeholder">
                  <Play size={48} className="text-gold" />
                  <h4>{activeVideo.title}</h4>
                  <p>Filmed on location with master artisan {activeVideo.artisan}.</p>
                  <span className="duration-tag">{activeVideo.duration} HD Documentary</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setActiveVideo(null)}
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
