#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MultiRegionS3CrrKmsCmkSourceStack } from '../lib/multi-region-s3-crr-kms-cmk-source-stack';
import { MultiRegionS3CrrKmsCmkTargetStack } from '../lib/multi-region-s3-crr-kms-cmk-target-stack';

const accountId = '012154182712';

const app = new cdk.App();

const targetStack = new MultiRegionS3CrrKmsCmkTargetStack(app, 'MultiRegionS3CrrKmsCmkTarget', {
  env: { account: accountId, region: 'us-east-2' },
});

const sourceStack = new MultiRegionS3CrrKmsCmkSourceStack(app, 'MultiRegionS3CrrKmsCmkSource', {
  env: { account: accountId, region: 'us-east-1' },
  targetBucket: targetStack.targetBucket,
  targetKeyIdSsmParameterName: targetStack.targetKeyIdSsmParameterName,
  targetRegion: targetStack.region
});

sourceStack.addDependency(targetStack);
