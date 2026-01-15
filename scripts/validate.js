const fs = require('fs');
const path = require('path');

const RULES_DIR = path.join(__dirname, '../src');

function validateRule(rule, filePath) {
    const requiredFields = ['id', 'pattern', 'detectionMethod', 'message', 'enforcementLevel'];
    const errors = [];

    // 1. Check required fields
    for (const field of requiredFields) {
        if (!rule[field]) {
            errors.push(`Missing required field: '${field}'`);
        }
    }

    // 2. Validate Regex
    if (rule.pattern) {
        try {
            new RegExp(rule.pattern);
        } catch (e) {
            errors.push(`Invalid Regex pattern: ${e.message}`);
        }
    }

    // 3. Validate Enum
    if (rule.enforcementLevel && !['error', 'info', 'warning'].includes(rule.enforcementLevel)) {
        errors.push(`Invalid enforcementLevel: '${rule.enforcementLevel}'. Must be 'error', 'info', or 'warning'.`);
    }

    if (errors.length > 0) {
        console.error(`\n❌ Error in ${path.basename(filePath)} (Rule ID: ${rule.id || 'Unknown'})`);
        errors.forEach(e => console.error(`   - ${e}`));
        return false;
    }

    return true;
}

function scanDirectory(dir) {
    let success = true;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!scanDirectory(fullPath)) success = false;
        } else if (file.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const rules = JSON.parse(content);

                // Handle both single object or array of rules
                const ruleList = Array.isArray(rules) ? rules : [rules];

                ruleList.forEach(rule => {
                    if (!validateRule(rule, fullPath)) success = false;
                });

            } catch (e) {
                console.error(`\n❌ Failed to parse JSON: ${fullPath}`);
                console.error(`   - ${e.message}`);
                success = false;
            }
        }
    }
    return success;
}

console.log('🔍 Validating Engram Rules...');
const passed = scanDirectory(RULES_DIR);

if (passed) {
    console.log('\n✅ All rules passed validation!');
    process.exit(0);
} else {
    console.error('\n💥 Validation failed. Please fix the errors above.');
    process.exit(1);
}
