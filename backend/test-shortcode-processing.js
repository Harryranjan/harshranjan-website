const https = require('http');

async function testShortcodeProcessing() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/pages/slug/homepage',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const content = json.page.content;
          
          console.log('\n🔍 Testing Shortcode Processing on Homepage\n');
          console.log('=' .repeat(60));
          
          // Check for iframe embeds
          const hasIframe = content.includes('<iframe');
          const iframeMatches = content.match(/<iframe[^>]*>/g);
          console.log(`\n✅ Has iframe embeds: ${hasIframe}`);
          if (iframeMatches) {
            console.log(`   Count: ${iframeMatches.length}`);
            iframeMatches.forEach((iframe, idx) => {
              const src = iframe.match(/src="([^"]*)"/);
              if (src) {
                console.log(`   ${idx + 1}. ${src[1]}`);
              }
            });
          }
          
          // Check for raw shortcodes (should NOT be present)
          const hasRawShortcode = content.includes('[form');
          const shortcodeMatches = content.match(/\[form[^\]]*\]/g);
          console.log(`\n${hasRawShortcode ? '❌' : '✅'} Has raw shortcodes: ${hasRawShortcode}`);
          if (shortcodeMatches) {
            console.log(`   Count: ${shortcodeMatches.length}`);
            shortcodeMatches.forEach((sc, idx) => {
              console.log(`   ${idx + 1}. ${sc}`);
            });
          }
          
          // Check if content is full HTML
          const isFullHTML = /^\s*<!DOCTYPE|^\s*<html/i.test(content);
          console.log(`\n📄 Is Full HTML page: ${isFullHTML}`);
          
          // Show content preview
          console.log('\n📋 Content Preview (first 800 chars):');
          console.log('-'.repeat(60));
          console.log(content.substring(0, 800));
          console.log('...');
          
          // Results summary
          console.log('\n' + '='.repeat(60));
          console.log('\n📊 SUMMARY:');
          if (hasIframe && !hasRawShortcode) {
            console.log('✅ SUCCESS: Shortcodes processed correctly!');
            console.log('   - Raw shortcodes converted to iframe embeds');
            console.log('   - Form will render in iframe');
          } else if (hasRawShortcode) {
            console.log('❌ ISSUE: Raw shortcodes still present');
            console.log('   - Shortcodes not being processed');
            console.log('   - Check if page API is using shortcodeProcessor');
          } else {
            console.log('ℹ️  INFO: No shortcodes or iframes detected');
          }
          
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

testShortcodeProcessing().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
