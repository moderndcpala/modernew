import { Star, Quote } from 'lucide-react';
import { imageSrc } from '../utils/imageSrc';

const averageRating = 4.6;
const reviews = [
  {
    rating: 5,
    text: 'Best Diagnostic Centre in Pala. Quite impressed by the professional and polite behavior of the staff. Experienced and skilled lab techs does clean, smooth and tidy sample collection procedure, maintaining perfect hygiene. Speedy and accurate results as well. Thanks.',
  },
  {
    rating: 4,
    text: 'Appreciating your hospitality and excellent services. Thank you.',
  },
  {
    rating: 5,
    text: 'Great service and friendly staff. Booking was easy and the turnaround time was fast.',
  },
];

const GoogleReviews = () => {
  return (
    <section className="py-16 bg-beige-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <img
              src={imageSrc('/google-logo-9808 1.png')}
              alt="Google logo"
              loading="lazy"
              decoding="async"
              className="mx-auto mb-4 h-8 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <p className="text-sm uppercase tracking-[0.2em] text-primary-green font-semibold mb-3">
              Google Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-2">
              Modern Diagnostic Centre Pala
            </h2>
            <div className="flex items-center justify-center gap-2 text-primary-green">
              <div className="relative inline-flex items-center">
                <div className="flex items-center gap-1 text-yellow-400/40">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4" />
                  ))}
                </div>
                <div
                  className="absolute inset-0 flex items-center gap-1 overflow-hidden text-yellow-400"
                  style={{ width: `${(averageRating / 5) * 100}%` }}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-sm font-semibold text-text-dark">
                {averageRating} average rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <Quote className="h-6 w-6 text-primary-green mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-text-dark">Google Review</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/search?q=modern+diagnostic+centre+pala&sca_esv=e4930b54a8b6c4ed&rlz=1C1CHWL_enIN1194IN1195&sxsrf=ANbL-n6tV46KX63qCtRlRug4Fmh2N_lZPw%3A1768599949138&ei=jbFqaeWcCJSKnesPkeGlmA8&oq=&gs_lp=Egxnd3Mtd2l6LXNlcnAiACoCCAEyBxAuGCcY6gIyBxAjGCcY6gIyDRAuGMcBGCcY6gIYrwEyDRAuGNEDGMcBGCcY6gIyBxAjGCcY6gIyBxAjGCcY6gIyDRAjGPAFGCcYyQIY6gIyBxAjGCcY6gIyDRAjGPAFGCcYyQIY6gIyBxAjGCcY6gIyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQEyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQEyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQEyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQEyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQEyFhAAGIAEGEMYtAIY5wYYigUY6gLYAQFIyw1QAFgAcAF4AZABAJgBAKABAKoBALgBAcgBAPgBAZgCAaACBagCEpgDBfEF3m7sIDG7hpm6BgYIARABGAGSBwExoAcAsgcAuAcAwgcDMi0xyAcEgAgA&sclient=gws-wiz-serp#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-white text-primary-green px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Read More Reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;



