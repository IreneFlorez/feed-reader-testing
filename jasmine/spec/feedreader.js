/* feedreader.js 
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test that loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL posted', function() {
            for (var i=0, len=allFeeds.length; i<len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            }
        });
        /* Test that loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names posted', function() {
            for (var i=0, len=allFeeds.length; i<len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe("string");
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* Test if menu element is hidden by default on page load.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // ref: https://api.jquery.com/hasclass/
        });
         /* Test that ensures the menu changes visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when clicked and does it hide when clicked again.
          */
        it('menu switches visibility', function() {
            $('a.menu-icon-link').trigger('click'); // show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide menu again
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });
    
    /* Initial Entries Test suite */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function(){
                done(); 
            });
         });
         it('are present', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    
    /* New Feed Selection Test Suite */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var startFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                startFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, function(){
                    done();
                });
            });
        });
        it('is different from starter feed', function(done) {
            var newFeed = $('.feed').html();
            expect(newFeed).not.toBe(startFeed);
            done();
        });
    });
    }());
