import { MapPin, BookOpen, Clock, ArrowRight } from 'lucide-react';

/**
 * StoryCard — Editorial magazine cultural story card.
 * Supports layout modes: 'featured' (large magazine cover) or 'compact' (side editorial card).
 */
const StoryCard = ({ story, featured = false, onRead }) => {
  return (
    <article
      className={`story-magazine-card ${featured ? 'story-card-featured' : 'story-card-compact'}`}
      onClick={() => onRead && onRead(story)}
    >
      <div className="story-img-container">
        <img
          src={story.image}
          alt={story.title}
          className="story-cover-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="story-gradient-overlay" />
        <span className="story-tradition-tag">{story.tradition || 'Living Lore'}</span>
      </div>

      <div className="story-card-details">
        <div className="story-meta-line">
          <span className="story-region">
            <MapPin size={13} /> {story.region || story.state || 'India'}
          </span>
          <span className="story-read-time">
            <Clock size={13} /> {story.readTime || '5 min read'}
          </span>
        </div>

        <h3 className="story-headline">{story.title}</h3>
        <p className="story-synopsis">{story.summary || story.excerpt || story.desc}</p>

        <button
          type="button"
          className="story-read-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRead && onRead(story);
          }}
        >
          <BookOpen size={14} />
          <span>Read Chronicle</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </article>
  );
};

export default StoryCard;
