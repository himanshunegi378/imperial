import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Progress } from '../../../components/ui/progress';
import { cn } from '../../../lib/utils';
import type { ChatStreamState } from '../../../api-hooks/useChatStream';

interface ProgressIndicatorProps {
  state: ChatStreamState;
  className?: string;
}

/**
 * Progress indicator component that displays real-time feedback
 * during chat message processing with SSE
 */
export const ProgressIndicator = ({ state, className }: ProgressIndicatorProps) => {
  const { status, currentStep, progress, error } = state;

  // Don't show anything when idle or complete
  if (status === 'idle') return null;

  const isError = status === 'error';
  const isComplete = status === 'complete';
  const isLoading = status === 'connecting' || status === 'streaming';

  return (
    <div 
      className={cn(
        'flex flex-col gap-2 p-3 rounded-lg border bg-card',
        isError && 'border-destructive bg-destructive/10',
        isComplete && 'border-green-500 bg-green-50 dark:bg-green-950',
        isLoading && 'border-blue-500 bg-blue-50 dark:bg-blue-950',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Status Icon */}
        {isError && (
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
        )}
        {isComplete && (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
        )}
        {isLoading && (
          <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin flex-shrink-0" />
        )}

        {/* Status Text */}
        <div className="flex-1 min-w-0">
          <p 
            className={cn(
              'text-sm font-medium truncate',
              isError && 'text-destructive',
              isComplete && 'text-green-700 dark:text-green-300',
              isLoading && 'text-blue-700 dark:text-blue-300'
            )}
          >
            {currentStep}
          </p>
          {error && (
            <p className="text-xs text-destructive/80 mt-1">
              {error}
            </p>
          )}
        </div>

        {/* Progress Percentage */}
        {!isError && progress > 0 && (
          <span 
            className={cn(
              'text-xs font-semibold tabular-nums flex-shrink-0',
              isComplete && 'text-green-600 dark:text-green-400',
              isLoading && 'text-blue-600 dark:text-blue-400'
            )}
          >
            {progress}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {!isError && progress > 0 && (
        <Progress 
          value={progress} 
          className={cn(
            'h-1.5',
            isComplete && '[&>div]:bg-green-600'
          )}
        />
      )}
    </div>
  );
};

/**
 * Compact inline progress indicator for use in chat input area
 */
export const InlineProgressIndicator = ({ state }: { state: ChatStreamState }) => {
  const { status, currentStep } = state;

  if (status === 'idle' || status === 'complete') return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
      <Loader2 className="h-3 w-3 animate-spin" />
      <span className="truncate">{currentStep}</span>
    </div>
  );
};


