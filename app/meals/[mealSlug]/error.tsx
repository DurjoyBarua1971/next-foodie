'use client';

import classes from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error}: ErrorProps) {
  const isMealNotFound = error.message.includes('not found');
  
  return (
    <main className={classes.error}>
      <div className={classes.errorContent}>
        <h1>{isMealNotFound ? 'Meal Not Found' : 'An Error Occurred!'}</h1>
        
        {isMealNotFound ? (
          <div className={classes.notFoundContent}>
            <p>🍽️ Sorry, we couldn't find the meal you're looking for.</p>
            <p>It might have been removed or the URL is incorrect.</p>
            <div className={classes.errorActions}>
              <a href='/meals' className={`${classes.btn} ${classes.btnPrimary}`}>
                Browse All Meals
              </a>
            </div>
          </div>
        ) : (
          <div className={classes.generalErrorContent}>
            <p>Failed to fetch meal data. Please try again.</p>
            <details className={classes.errorDetails}>
              <summary>Error Details</summary>
              <p className={classes.errorMessage}>{error.message}</p>
              {error.digest && <p className={classes.errorDigest}>Error ID: {error.digest}</p>}
            </details>
            <div className={classes.errorActions}>
              <a href='/meals' className={`${classes.btn} ${classes.btnSecondary}`}>
                Back to Meals
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}