# Mongo Aggregation Pipeline Debugger For Mongoose

A developer tool for debugging Mongo aggregation pipelines executed through Mongoose models.
Mongo pipelines are difficult to debug, as any pipeline passed to a Mongoose model will get executed in its entirely on invocation of `.aggregate`.
In other words, there is no way to check the state of the documents at an intermediate stage of the pipeline.

This tool repeatedly runs the pipeline for every stage, and collects the results of running the pipeline up to each stage.
This allows the output of each stage to be compared with the outputs from other stages.

**This is just a quick package I designed for fun.**
