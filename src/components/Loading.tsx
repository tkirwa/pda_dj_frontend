import React, { useEffect, useState } from 'react';
import { Progress, Container } from 'semantic-ui-react';

const LoadingProgress: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isLoading && progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [isLoading, progress]);

  return (
    <Container text>
      {/* <Header as="h3">Loading Progress</Header> */}
      <div>
        {isLoading ? (
          <>
            <Progress className="ui top attached progress" percent={progress} indicating />
          </>
        ) : (
          <></>
          // <p>Loading complete</p>
        )}
      </div>
    </Container>
  );
};

export default LoadingProgress;
