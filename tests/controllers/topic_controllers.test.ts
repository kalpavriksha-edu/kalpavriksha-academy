import TopicService from "../../src/service/topicService"

describe('works', () => {
  it('returns the expected value', () => {
    const topic =new TopicService();
    expect(10+10).toBe(20);
  });
});
