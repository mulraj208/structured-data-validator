/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { expect } from 'chai';

import { loadTestData } from './utils.js';
import { Validator } from '../../validator.js';

describe('NewsMediaOrganizationValidator', () => {
  describe('JSON-LD', () => {
    let validator;

    beforeEach(() => {
      validator = new Validator();
      validator.globalHandlers = [];
    });

    it('should validate a correct news media organization', async () => {
      const data = await loadTestData('NewsMediaOrganization/valid.json', 'jsonld');
      const issues = await validator.validate(data);
      expect(issues).to.have.lengthOf(0);
    });

    it('should detect missing required fields and optional recommendations', async () => {
      const data = await loadTestData('NewsMediaOrganization/invalid.json', 'jsonld');
      const issues = await validator.validate(data);
      expect(issues).to.have.lengthOf(6);
      const messages = issues.map(i => i.issueMessage);
      expect(messages).to.contain('Required attribute "name" is missing');
      expect(messages).to.contain('Required attribute "logo" is missing');
      expect(messages).to.contain('Required attribute "url" is missing');
      expect(messages).to.contain('Required attribute "sameAs" is missing');
      expect(messages).to.contain('Missing field "foundingDate" (optional)');
      expect(messages).to.contain('Missing field "address" (optional)');
    });
  });
});
