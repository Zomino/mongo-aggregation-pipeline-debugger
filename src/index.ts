import type { Model, PipelineStage } from 'mongoose';

interface Options {
    sampleSize?: number;
};

async function debugMongoAggregationPipeline<T>(model: Model<T>, pipeline: PipelineStage[], options: Options = {}) {
    const { sampleSize } = options;

    const results = [];

    for (let i = 0; i < pipeline.length; i++) {
        const pipelineSlice = pipeline.slice(0, i + 1);

        if (sampleSize) {
            pipelineSlice.push({ $sample: { size: sampleSize } });
        }

        const startTime = Date.now();

        const sliceResult = await model.aggregate(pipelineSlice);

        const endTime = Date.now();

        const stageResults = {
            // Each Mongo aggregation stage has a single operator
            stageOperator: Object.keys(pipeline[i])[0],
            executionTimeMs: endTime - startTime,
            documents: sliceResult,
        };

        results.push(stageResults);
    }

    const logData = results.map((result) => ({
        stageOperator: result.stageOperator,
        'executionTime (milliseconds)': result.executionTimeMs,
        documentCount: result.documents.length,
    }));

    console.table(logData);

    return results;
}

export default debugMongoAggregationPipeline;
